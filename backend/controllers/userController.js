import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import passport from '../config/passport.js';
import cookieParser from 'cookie-parser';
import { signAccessToken, generateRefreshToken, persistRefreshToken, verifyRefreshToken } from '../utils/tokenService.js';
import config from '../config/environment.js';
import { validatePasswordStrength } from '../utils/passwordUtils.js';
import { AppError } from '../middleware/errorsHandler.js';
import { asyncHandler } from '../middleware/errorsHandler.js';

// register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, department, yearOfStudy, phone } = req.body;

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    throw new AppError(`Password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    department,
    yearOfStudy,
    phone
  });

  const token = generateToken(user._id, user.role);

  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
});

// register admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, department, yearOfStudy, phone } = req.body;

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    throw new AppError(`Password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    department,
    yearOfStudy,
    phone,
    role: 'admin' // Set role to admin
  });

  const token = generateToken(user._id, user.role);

  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'Admin user registered successfully',
    data: {
      user,
      token
    }
  });
});

// login
export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    try {
      user.lastLogin = new Date();
      await user.save();

      const access = signAccessToken(user);
      const refresh = generateRefreshToken();
      await persistRefreshToken(user._id, refresh);

      const commonCookie = {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      };

      res
        .cookie('access_token', access, { ...commonCookie, maxAge: 15 * 60 * 1000 })
        .cookie('refresh_token', refresh, { ...commonCookie, maxAge: 30 * 24 * 60 * 60 * 1000 })
        .json({
          success: true,
          message: 'Login successful',
          data: {
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
          }
        });
    } catch (e) {
      next(e);
    }
  })(req, res, next);
};

// refresh token
export const refreshToken = asyncHandler(async (req, res) => {
  const refresh = req.cookies?.refresh_token;
  const userId = req.body?.userId;
  if (!refresh || !userId) {
    return res.status(401).json({ success: false, message: 'No refresh token' });
  }

  const user = await verifyRefreshToken(userId, refresh);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }

  const access = signAccessToken(user);
  const newRefresh = generateRefreshToken();
  await persistRefreshToken(user._id, newRefresh);

  const commonCookie = {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  res
    .cookie('access_token', access, { ...commonCookie, maxAge: 15 * 60 * 1000 })
    .cookie('refresh_token', newRefresh, { ...commonCookie, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .json({ success: true, message: 'Token refreshed' });
});

// logout
export const logout = (req, res) => {
  res
    .clearCookie('access_token', { path: '/' })
    .clearCookie('refresh_token', { path: '/' })
    .json({ success: true, message: 'Logged out successfully' });
};

// get profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.json({
    success: true,
    data: {
      user
    }
  });
});

// update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, department, yearOfStudy, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      department,
      yearOfStudy,
      phone
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: updatedUser
    }
  });
});

// change password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400);
  }

  const passwordValidation = validatePasswordStrength(newPassword);
  if (!passwordValidation.isValid) {
    throw new AppError(`Password validation failed: ${passwordValidation.errors.join(', ')}`, 400);
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

// get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, department, search } = req.query;

  const filter = { isActive: true };
  if (role) filter.role = role;
  if (department) filter.department = department;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        usersPerPage: parseInt(limit)
      }
    }
  });
});

// get user by id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      user
    }
  });
});

// update user (Admin only!)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, department, yearOfStudy, phone, isActive } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      role,
      department,
      yearOfStudy,
      phone,
      isActive
    },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!updatedUser) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: {
      user: updatedUser
    }
  });
});

// delete user (Admin only!)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// deactivate user (Admin only!)
export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  ).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User deactivated successfully',
    data: {
      user
    }
  });
});