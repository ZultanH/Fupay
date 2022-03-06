const WalletModel = require('../../models/Wallet')

const get = async (_req, _res) => {
    try {
        const user = _req.user
        const foundWallet = await WalletModel.findOne({Customer: user._id})
        if (!foundWallet) {
            return _res.status(400).json({status: 'fail', message: 'Could not find wallet!'})
        }
        _res.status(200).json({status: 'success', amount: foundWallet.amount || 0})
    }catch (error) {
        return _res.status(400).json({status: 'fail', message: 'Error!'})
    }
}

module.exports = get
