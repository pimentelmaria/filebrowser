// config/passport-config.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/oauth2/redirect/google'
  },
  function (issuer, profile, cb) {
    // Your authentication logic here
    // See the example provided in your documentation
    return cb(null, profile);
  }
));

passport.serializeUser(function (user, cb) {
  // Serialize the user data, store user ID in session
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  // Deserialize the user data, retrieve user from session
  cb(null, obj);
});
