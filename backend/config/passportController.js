const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const { User } = require("../models/models");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN,
};

console.log('JWT Secret configured:', !!process.env.JWT_TOKEN);

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      console.log('JWT Payload:', payload);
      
      const user = await User.findByPk(payload.userId);
      console.log('User found:', !!user);
      
      if (user) {
        return done(null, user);
      } else {
        console.log('User not found for ID:', payload.userId);
        return done(null, false);
      }
    } catch (err) {
      console.error('JWT Strategy error:', err);
      return done(err, false);
    }
  })
);

module.exports = passport; 