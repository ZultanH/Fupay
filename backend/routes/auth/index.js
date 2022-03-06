const passport = require('passport');
const {Router} = require('express');
const {validate: validateLogin, login} = require('./login');
const {validate: validateSignUp, signup} = require('./signup');

module.exports = () => {
    const router = Router()
    router.post(
        '/login', 
        validateLogin,
        login,
    )
    router.post(
        '/signup', 
        validateSignUp, 
        passport.authenticate('signup', {session: false}), 
        signup,
    )
    return router;
}
