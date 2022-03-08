const CustomerModel = require("../../models/Customer")
const WalletModel = require("../../models/Wallet")

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

const randombetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const signup = async (_req, _res, _next) => {  
    try {
      const customerId = _req.user._id;
      const firstName = _req.body.firstName;
      const generatedPayId = `${firstName.slice(0, 5) + randombetween(1000, 2000)}@test.fupay.com`
      const wallet = await WalletModel.create({
        Customer: customerId, 
        accountId: "", 
        PayId: generatedPayId,
      })
      const postBody = { 
        firstName: _req.body.firstName, 
        lastName: _req.body.lastName,
        wallet: wallet._id,
      }
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
