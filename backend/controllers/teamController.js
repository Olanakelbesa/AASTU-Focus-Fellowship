import { asyncHandler } from '../middleware/errorsHandler.js';
import { AppError } from '../middleware/errorsHandler.js';
import Team from '../models/Team.js';

// Create new team
export const createTeam = asyncHandler(async (req, res) => {
  const teamData = {
    ...req.body,
    leader: req.user._id
  };

  // Check if user is already a leader of another team
  const existingTeam = await Team.findOne({ leader: req.user._id, isActive: true });
  if (existingTeam) {
    throw new AppError('You can only lead one team at a time', 400);
  }

  const team = await Team.create(teamData);

  res.status(201).json({
    success: true,
    message: 'Team created successfully',
    data: team
  });
});

// Get all teams (with filters)
export const getAllTeams = asyncHandler(async (req, res) => {
  const {
    category,
    search,
    page = 1,
    limit = 10,
    sortBy = 'name',
    sortOrder = 'asc'
  } = req.query;

  // Build filter
  const filter = { isActive: true, isPublic: true };
  
  if (category) {
    filter.category = category;
  }
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Pagination
  const skip = (page - 1) * limit;

  const teams = await Team.find(filter)
    .populate('leader', 'name email avatar')
    .populate('members.user', 'name email avatar')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Team.countDocuments(filter);

  res.json({
    success: true,
    data: teams,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// Get single team
export const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate('leader', 'name email avatar department')
    .populate('members.user', 'name email avatar department yearOfStudy');

  if (!team) {
    throw new AppError('Team not found', 404);
  }

  if (!team.isActive) {
    throw new AppError('Team is not active', 400);
  }

  res.json({
    success: true,
    data: team
  });
});

// Update team
export const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Check if user can update this team
  if (team.leader.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to update this team', 403);
  }

  const updatedTeam = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('leader', 'name email avatar');

  res.json({
    success: true,
    message: 'Team updated successfully',
    data: updatedTeam
  });
});

// Delete team
export const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Check if user can delete this team
  if (team.leader.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to delete this team', 403);
  }

  await Team.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Team deleted successfully'
  });
});

// Add member to team
export const addMember = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const teamId = req.params.id;

  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Check if user can add members
  if (team.leader.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to add members to this team', 403);
  }

  // Check if team is full
  if (team.isFull) {
    throw new AppError('Team is full', 400);
  }

  // Check if user is already a member
  const existingMember = team.members.find(
    member => member.user.toString() === userId
  );

  if (existingMember) {
    if (existingMember.isActive) {
      throw new AppError('User is already a member of this team', 400);
    } else {
      // Reactivate inactive member
      existingMember.isActive = true;
      existingMember.role = role;
      await team.save();
      
      return res.json({
        success: true,
        message: 'Member reactivated successfully',
        data: team
      });
    }
  }

  // Add new member
  team.members.push({
    user: userId,
    role: role || 'member',
    joinedAt: new Date(),
    isActive: true
  });

  await team.save();

  res.json({
    success: true,
    message: 'Member added successfully',
    data: team
  });
});

// Remove member from team
export const removeMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const teamId = req.params.id;

  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Check if user can remove members
  if (team.leader.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to remove members from this team', 403);
  }

  // Cannot remove the team leader
  if (team.leader.toString() === userId) {
    throw new AppError('Cannot remove the team leader', 400);
  }

  const memberIndex = team.members.findIndex(
    member => member.user.toString() === userId
  );

  if (memberIndex === -1) {
    throw new AppError('User is not a member of this team', 400);
  }

  // Deactivate member instead of removing
  team.members[memberIndex].isActive = false;
  await team.save();

  res.json({
    success: true,
    message: 'Member removed successfully',
    data: team
  });
});

// Update member role
export const updateMemberRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const teamId = req.params.id;

  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Check if user can update member roles
  if (team.leader.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to update member roles in this team', 403);
  }

  const member = team.members.find(
    member => member.user.toString() === userId
  );

  if (!member) {
    throw new AppError('User is not a member of this team', 400);
  }

  member.role = role;
  await team.save();

  res.json({
    success: true,
    message: 'Member role updated successfully',
    data: team
  });
});

// Get user's teams
export const getUserTeams = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const teams = await Team.find({
    $or: [
      { leader: userId },
      { 'members.user': userId, 'members.isActive': true }
    ],
    isActive: true
  })
    .populate('leader', 'name email avatar')
    .populate('members.user', 'name email avatar')
    .sort({ name: 1 });

  res.json({
    success: true,
    data: teams
  });
});

// Join team (for public teams)
export const joinTeam = asyncHandler(async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;

  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError('Team not found', 404);
  }

  if (!team.isActive) {
    throw new AppError('Team is not active', 400);
  }

  if (!team.isPublic) {
    throw new AppError('This team is not accepting new members', 400);
  }

  if (team.isFull) {
    throw new AppError('Team is full', 400);
  }

  // Check if user is already a member
  const existingMember = team.members.find(
    member => member.user.toString() === userId
  );

  if (existingMember) {
    if (existingMember.isActive) {
      throw new AppError('You are already a member of this team', 400);
    } else {
      // Reactivate inactive membership
      existingMember.isActive = true;
      await team.save();
      
      return res.json({
        success: true,
        message: 'Successfully rejoined the team',
        data: team
      });
    }
  }

  // Add user to team
  team.members.push({
    user: userId,
    role: 'member',
    joinedAt: new Date(),
    isActive: true
  });

  await team.save();

  res.json({
    success: true,
    message: 'Successfully joined the team',
    data: team
  });
});

// Leave team
export const leaveTeam = asyncHandler(async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;

  const team = await Team.findById(teamId);
  if (!team) {
    throw new AppError('Team not found', 404);
  }

  // Cannot leave if you're the leader
  if (team.leader.toString() === userId) {
    throw new AppError('Team leader cannot leave the team. Transfer leadership or delete the team instead.', 400);
  }

  const memberIndex = team.members.findIndex(
    member => member.user.toString() === userId
  );

  if (memberIndex === -1) {
    throw new AppError('You are not a member of this team', 400);
  }

  // Deactivate membership
  team.members[memberIndex].isActive = false;
  await team.save();

  res.json({
    success: true,
    message: 'Successfully left the team',
    data: team
  });
});