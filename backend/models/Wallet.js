const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WalletSchema = new Schema({
    Customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    amount: {type: Number, default: 0},
    accountId: String,
    PayId: String,
})

const model = mongoose.model('Wallet', WalletSchema)
module.exports = model
