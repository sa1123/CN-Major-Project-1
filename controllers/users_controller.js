module.exports.profile = function(req, res){
    return res.render('profile/', {
        title: "Users"
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
    // Later
}

// sign in and create session for the user
module.exports.create = function(req, res){
    // Later
}