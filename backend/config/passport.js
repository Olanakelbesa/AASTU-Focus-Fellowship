import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import config from '../config/environment.js';

const cookieExtractor = (req) => {
  if (req && req.cookies && req.cookies.access_token) return req.cookies.access_token;
  return null;
};

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      try {
        const user = await User.findByEmail(email).select('+password');
        if (!user) return done(null, false);
        if (user.lockUntil && user.lockUntil > new Date()) return done(null, false);
        if (!user.isActive) return done(null, false);
        const valid = await user.comparePassword(password);
        if (!valid) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    { jwtFromRequest: cookieExtractor, secretOrKey: config.JWT_SECRET },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('-password');
        if (!user) return done(null, false);
        if (!user.isActive) return done(null, false);
        if (user.changedPasswordAfter?.(payload.iat)) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // Fixed: matches route
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Validate profile data
        if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
          return done(new Error('No email in Google profile'), null);
        }

        const email = profile.emails[0].value.toLowerCase();
        const googleId = profile.id;
        const displayName = profile.displayName || 'Unknown User';
        const avatarUrl = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

        // Check for existing user by googleId first
        let user = await User.findOne({ googleId });
        
        // If no user found, check for existing user with same email
        if (!user) {
          user = await User.findOne({ email });
          // Link Google account to existing user
          if (user) {
            user.googleId = googleId;
            if (avatarUrl && !user.avatar) user.avatar = avatarUrl;
            await user.save();
          } else {
            // Create new user
            user = new User({
              googleId,
              email,
              name: displayName,
              avatar: avatarUrl,
            });
            await user.save();
          }
        }

        // Always update lastLogin
        user.lastLogin = new Date();
        await user.save();

        done(null, user);
      } catch (err) {
        console.error('Google OAuth error:', err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;


