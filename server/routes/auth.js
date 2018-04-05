const passport = require('passport');

module.exports = app => {
  //The route where users will start G-Auth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      //Scope tells google what specific info about the user we want
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    //On the callback url, passport will see the code and will handle
    //the req appropriately -- turn the code into a profile
    passport.authenticate('google')
  );
};
