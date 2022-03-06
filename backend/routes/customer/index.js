const {Router} = require('express')
const passport = require('passport')

const getInfo = require('./info')

module.exports = () => {
    const router = Router();

    router.get(
        '/info',
        passport.authenticate('jwt', {session: false}),
        getInfo,
    )
    return router
}
