// var express = require('express');
// var router = express.Router();
// var passport = require('passport');

// router.route('/logout')
// .get(function(req, res) {
//     req.logout();
//     res.redirect('/#/Login');
// });

// router.route('/userSignup')
// .post(function(){
//     passport.authenticate('local-signup', {
//         successRedirect : '/#/Dashboard',
//         failureRedirect : '/#/Signup',
//         failureFlash : true
//     });
// });

// router.route('/userLogin')
// .post(function() {
//     passport.authenticate('local-login', {
//     successRedirect : '/#/Dashboard',
//         failureRedirect : '/#/Login',
//         failureFlash : true
//     });
// });

module.exports = function(app, passport) {
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     user : req.user
    // });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/#/Login');
    });

    // process the signup form
    app.post('/userSignup', passport.authenticate('local-signup', {
        successRedirect : '/#/Dashboard',
        failureRedirect : '/#/Signup',
        failureFlash : true
    }));

    // process the login form
    app.post('/userLogin', passport.authenticate('local-login', {
        successRedirect : '/#/Dashboard',
        failureRedirect : '/#/Login',
        failureFlash : true
    }));

};

// module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('#/Login');
}