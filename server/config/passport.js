const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/oauth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            return done(null, user); // If the user exists, return the user
          }

          // If the user doesn't exist, create a new user
          user = new User({
            googleId: id,
            username: displayName,
            email: emails[0].value,
            password: null, // Password is not required for OAuth
          });

          await user.save();
          done(null, user);
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // No callback, just await the result
      done(null, user); // Pass the user to done
    } catch (err) {
      done(err, null); // Handle any errors
    }
  });
};
