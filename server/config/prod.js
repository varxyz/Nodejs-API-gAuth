module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //heroku automatically binds the env variable here, but if you want to use mlab
  //without heroku you need to specify the full db address here. Make a new user on mlab
  //and use the credentials in the link
  //eg: mongodb://<dbuser>:<dbpassword>@ds135399.mlab.com:35399/YOUR_DB_NAME
  mongoURI: process.env.MONGODB_URI,
  cookieKey: process.env.COOKIE_KEY
};
