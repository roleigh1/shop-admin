const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require("../models/models");

passport.use(new LocalStrategy({
  userNameField: "username",
  passwordField: "password"
}, async (username, password, done) => {
  try {
    const user = await User.findOne({
      username: username

    });
    if (!user) {
      return done(null, false, { message: "Incorrect Username" })
    }
    const isMatch = await bcrypt.compare(password, user.passport);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect Password" })
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your-secret-key"
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
})); 

passport.serializeUser((user,done) => {
  done(null,user._id)
})
passport.deserializeUser(async (id,done) => {
  try{
    const user = await User.findById(id); 
    done(null,user); 
  }catch(error){
    done(error,null); 
  }
}); 

module.exports = passport; 