# Node API w/ Google OAUTH

This is a simple project starter for people who want to get started on their app right away without all the overheads of setting up a initial project boilerplate. You can save data with MongoDb or access some sample data directly from the app.
You’ll need to make an app with google and get the `CLIENT_ID` and `CLIENT_SECRET` first. For development use you can add them in `./config/dev.js` or add them directly as environment variables. Either way, there is a check in place in `keys.js`. Also, you will need to set the authorized callback urls for your google app beforehand.

```javascript
npm i && npm run dev
```

To log in - navigate to `/auth/google` and to logout - to `/logout` routes. To retrieve currently logged in user — `/api/current_user`. Sample data is accessible within the `/users` route and `admins` (for the latter you’ll need to be authenticated first).
