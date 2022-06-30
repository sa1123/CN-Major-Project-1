const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');
const { profile } = require('console');

passport.use(new googleStrategy({
        clientID: "",
        clientSecret: "",
        callbackURL: "",
    },

    function(accessToken, refreshToken, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log("error in google passport", err); return;}

            console.log(profile);

            if (user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log("error in creating google passport strategy", err); return;}

                    return done(null, user);
                })
            }
        });
    }
))

module.exports = passport