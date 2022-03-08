const CustomerModel = require('../../models/Customer')

const get = async (_req, _res) => {
    try {
        const user = _req.user
        const populatedCustomer = await CustomerModel.findById(user._id)
        .populate('wallet')
        .lean()

        _res.status(200).json({
            _id: populatedCustomer._id || '',
            email: populatedCustomer.email || '',
            firstName: populatedCustomer.firstName || '',
            lastName: populatedCustomer.lastName || '',
            wallet: {
                amount: populatedCustomer.wallet.amount || 0,
                accountId: populatedCustomer.wallet.accountId || '',
                PayId: populatedCustomer.wallet.PayId || '',
            }
        })
    } catch (error) {
        console.error(error)
        return _res.status(400).json({status: 'fail', message: 'Error!'})
    }
}

module.exports = get
