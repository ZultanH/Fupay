const { Router } = require('express');
const walletRoutes = require('./wallet/index')
const customerRoutes = require('./customer/index')
const authRoutes = require('./auth/index')
module.exports = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({
      version: '0.1'
    });
  });
  
  router.use('/customer', customerRoutes())
  router.use('/wallet', walletRoutes())
  router.use('/auth', authRoutes())
  return router
}
