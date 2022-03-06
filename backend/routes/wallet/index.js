const {Router} = require('express')
const passport = require('passport')

const getAmount = require('./amount')
const updateAmount = require('./update')

module.exports = () => {
    const router = Router();
    router.get(
        '/amount',
        passport.authenticate('jwt', {session: false}),
        getAmount,
    )

    router.post(
        '/update',
        passport.authenticate('jwt', {session: false}),
        updateAmount,
    )
    return router
}
