const {body, validationResult} = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validate = [
    body('password').trim().not().isEmpty().withMessage('Password is required'),
    body('email').isEmail(),
];

const login = async (_req, _res, _next) => {
    const errors = validationResult(_req);
  
    if (!errors.isEmpty()) {
      return _res.status(400).json({
          success: false,
          message: 'Error!'
      })
    }
    passport.authenticate('login', {session: false}, (err, user, info) => {
      try {
        if (err || !user) {
          return _res.status(401).json({
            success: false,
            message: info,
          });
        }
  
        _req.login(user, {session: false}, async error => {
          if (error) {
            return _res.status(401).json({
                success: false,
                message: 'Error 100'
            });
          }
          const token = jwt.sign({_id: user._id}, process.env.SESSION_SECRET);
          return _res.json({
            success: true,
            message: info.message ? info.message : 'Login Successful',
            token: token,
          });
        });
      } catch (error) {
        return _res.status(401).json({
            success: false,
            message: 'Error! 200'
        })
      }
    })(_req, _res, _next);
};

module.exports = {login, validate}
