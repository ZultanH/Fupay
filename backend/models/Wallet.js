const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    amount: Number,
    paymentMethod: String,
    date: {type: Date, default: new Date()},
})

const WalletSchema = new Schema({
    Customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    amount: {type: Number, default: 0},
    PayId: String,
    transactions: [PaymentSchema],
})

const model = mongoose.model('Wallet', WalletSchema)
module.exports = model
