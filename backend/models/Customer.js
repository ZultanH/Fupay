const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
    },
})

CustomerSchema.pre('save', async function (next) {
    const customer = this
    const saltRounds = 10
    if (!customer.isModified('password')) {
        return next()
    }
    // Hash the password with a salt round of 10, the higher the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(customer.password, saltRounds)
    //Replace the plain text password with the hash and then store it
    customer.password = hash
    //Indicates that we're done and moves on to the next middleware
    next();
})

CustomerSchema.methods.comparePassword = async function(password) {
    const customer = this
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, customer.password)
    return compare;
}

const model = mongoose.model('Customer', CustomerSchema)
module.exports = model
