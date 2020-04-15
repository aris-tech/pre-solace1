const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const config = require('../config');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Since we're getting an encrypted JWT token as a parameter, it'd be better if we could just have it decrypted automatically, this is what this option does
  secretOrKey: config.secretOrKey,
};

const googleOpts = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl, // After logging in, we should be redirected to the home page
};

module.exports = (passport) => {
  // This is called as middleware to make protected endpoints
  passport.use(
    new JwtStrategy(jwtOpts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }),
  );
  // Note: This is called in the google login/callback stages. This is NOT used to make endpoints protected
  passport.use(
    new GoogleStrategy(
      googleOpts,
      (accessToken, refreshToken, profile, done) => {
        User.findOne(
          {
            providerId: profile.id,
          },
          function (err, user) {
            if (err) {
              console.log(err);
              return done(err);
            }

            if (!user) {
              user = new User({
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                provider: 'google',
                providerId: profile.id,
                creationDate: Date.now(),
              });
              user.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Created new google oauth user: ${user}`);
                }

                return done(err, user);
              });
            } else {
              console.log('An account with this google log in already exists');
              return done(err, user);
            }
          },
        );
      },
    ),
  );
};
