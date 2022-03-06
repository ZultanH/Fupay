const CustomerModel = require("../../models/Customer")
const { body } = require('express-validator');

const validate = [
    body('email').not().isEmpty().isEmail().trim(),
    body('password')
      .trim()
      .custom((value, { req, loc, path }) => {
        if (value.length < 8) {
          throw new Error('Password should be 8 or more characters.');
        } else {
          return value;
        }
      }),
    body('firstName').not().isEmpty().isString().trim(),
    body('lastName').not().isEmpty().isString().trim(),
];

const signup = async (_req, _res, _next) => {  
    try {
      const postBody = { 
        firstName: _req.body.firstName, 
        lastName: _req.body.lastName,
      }
      const customerId = _req.user._id;
      await CustomerModel.findByIdAndUpdate(customerId, postBody);
      return _res.status(200).json({
        success: true,
        message: "Succesfully signed up!"
      });
    } catch (err) {
        console.error(err)
        return _res.status(401).json({
          success: false,
          message: 'Error! 100'
        })
    }
};

module.exports = {validate, signup}
