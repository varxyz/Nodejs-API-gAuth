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

  app.get('/api/logout', (req, res) => {
    /**logout is one of the methods attached by passport
     * that allows us to manipulate the cookie handling
     */
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    /**
     * user is attached to express req object by passport
     */
    res.send(req.user);
  });
};
