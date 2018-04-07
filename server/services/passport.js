const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//keys are the data(clientID, secret, etc) provided by google for your app
const keys = require('../config/keys');

const User = mongoose.model('google_users');

passport.serializeUser((user, done) => {
  //user argument is the just-retrieved user model from the db
  //prior to being saved or checked against the db entries
  done(null, user.id);
  //user.id is the _id asigned autmatically by mongo on entry creation
  //we use this id and not the profile.id(googleID) because we can have
  //multiple auth providers(like facebook, linkedIn) and those id's
  //can be different, unlike those assigned by MongoDb
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //callbackURL is the url google will use to send the query-string
      //code back to the server so we can make a follow-up request
      //to get the actual user profile
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        existingUser
          ? done(null, existingUser)
          : new User({
              googleID: profile.id
            })
              .save()
              .then(user => done(null, user));
      });
    }
  )
);
