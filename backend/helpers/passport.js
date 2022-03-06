const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const CustomerModel = require("../models/Customer")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { validationResult } = require('express-validator');

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (_req, email, password, done) => {
        try {
          const errors = validationResult(_req);
          if (!errors.isEmpty()) {
            console.error(errors)
            return done(errors.array());
          }
          email = email.toLowerCase();
          const accountExists = await CustomerModel.findOne({ email: email });
          if (accountExists) {
            return done(new Error('Account with that email already exists'));
          }
          //Save the information provided by the Customer to the the database
          const customer = await CustomerModel.create({ email, password });
          //Send the user information to the next middleware
          return done(null, customer);
        } catch (error) {
          done(error);
        }
      },
    ),
);

//Create a passport middleware to handle Customer login
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        //Find the customer associated with the email provided by the customer
        email = email.toLowerCase();
        const customer = await CustomerModel.findOne({ email });
        if (!customer) {
          //If the Customer isn't found in the database, return a message
          return done(null, false, {
            success: false,
            message: 'Customer not found',
          });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const _validate = await customer.comparePassword(password);
        if (!_validate) {
          return done(null, false, {
            success: false,
            message: 'Wrong Email or Password',
          });
        }
        //Send the user information to the next middleware
        return done(null, customer, {
          success: true,
          message: 'Logged in Successfully',
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

//This verifies that the token sent by the user is valid
passport.use(
  new JwtStrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: process.env.SESSION_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        //Pass the customer details to the next middleware
        const id = token._id;
        const _customer = await CustomerModel.findById(id);
        if (_customer) {
          return done(null, _customer);
        }
        return done(new Error('No Customer found'));
      } catch (error) {
        done(error);
      }
    },
  ),
);
