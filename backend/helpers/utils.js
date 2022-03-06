const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.parse({path: '../config.env'})

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res
    .status(401)
    .json({success: false, message: 'Unauthorized user. Please sign in.'});
};

const createToken = customer => {
    const body = {_id: customer._id};
    return jwt.sign({customer: body}, process.env.SESSION_SECRET, {
      expiresIn: '7d',
    });
};

module.exports = {isAuthenticated, createToken}
