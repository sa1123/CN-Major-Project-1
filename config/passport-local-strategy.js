const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user) {
            if(err){
                console.log('Error in finding user');
                return done(err);
            }
            if (!user || user.password != password){
                console.log("Invalid Username/Password");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserialize the user from key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }

        return done(null, user);
    });
});


module.exports = passport;