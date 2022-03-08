const WalletModel = require('../../models/Wallet')
const dotenv = require('dotenv')
dotenv.config({path: '../../config.env'})

const post = async (_req, _res) => {
    try {
        const customer = _req.user
        const {amount, paymentMethod} = _req.body
        const foundWallet = await WalletModel.findOne({Customer: customer._id})
        if (!foundWallet) {
            return _res.status(400).json({success: false, message: 'Could not find wallet!'})
        }
        if (amount > process.env.DEPOSIT_LIMIT) {
            return _res.status(400).json({success: false, message:'Deposit amount exceeds limit!'})
        }
        const newTransaction = {
            amount: amount * 100,
            paymentMethod,
        }
        console.log('Amount', amount)
        await WalletModel.updateOne({Customer: customer._id}, {$inc: {amount: amount * 100}}) // find wallet by customer id, increment amount by deposit amount, account for format in cents
        await WalletModel.updateOne({Customer: customer._id}, {$push: {
            transactions: newTransaction,
        }})
        return _res.status(200).json({
            success: true,
            message: 'Successfully updated wallet',
        })
    }catch (error) {
        console.error(error)
        return _res.status(400).json({status: 'fail', message: 'Error!'})
    }
}

module.exports = post
