const passport = require('passport');
const fs = require('fs');
const path = require('path');

module.exports = app => {
  app.get('/users', (req, res) => {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../config/my.json'),
      'utf-8'
    );
    res.json(JSON.parse(data));
  });

  app.get('/admins', (req, res) => {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../config/admins.json'),
      'utf-8'
    );
    if (req.user) {
      res.send(JSON.parse(data));
    }
    res.status(401).send('You need to be logged in to access this resource');
  });

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
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:3001');
    }
  );

  app.get('/logout', (req, res) => {
    /**logout is one of the methods attached by passport
     * that allows us to manipulate the cookie handling
     */
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    /**
     * user is attached to express req object by passport
     */
    res.send(req.user);
  });
};
