const User = require("../models/user");

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    });
}


// Render Sign Up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "FriendFace || Sign Up"
    })
}


// Render Sign In page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "FriendFace || Sign In"
    })
}


// get sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user during sign up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user during sign up'); return}

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    });
}


// sign in and create session for the user
module.exports.createSession = function(req, res){
    // find user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user during sign in'); return}

        // handle user found
        if(user){ 
            // wrong password
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
            // handle user not found
            return res.redirect('back');
        }
    })    
}