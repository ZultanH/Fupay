const WalletModel = require('../../models/Customer')
const dotenv = require('dotenv')
dotenv.config({path: '../../config.env'})

const post = async (_req, _res) => {
    try {
        const customer = _req.user
        const {amount, paymentMethod, paymentDetails} = _req.body
        const foundWallet = await WalletModel.findOne({Customer: customer._id})
        if (!foundWallet) {
            return _res.status(400).json({status: 'fail', message: 'Could not find wallet!'})
        }
        if (amount > process.env.DEPOSIT_LIMIT) {
            return _res.status(400).json({status: 'fail', message:'Deposit amount exceeds limit!'})
        }
        if (foundWallet.paymentDetails !== paymentDetails) { // if payment details (acc no# )
            return _res.status(400).json({status: 'fail', message: 'Incorrect payment details!'})
        }
        await WalletModel.updateOne({customer: _id}, {$inc: {amount: amount}}) // find wallet by customer id, increment amount by deposit amount
    }catch (error) {
        return _res.status(400).json({status: 'fail', message: 'Error!'})
    }
}

module.exports = post
