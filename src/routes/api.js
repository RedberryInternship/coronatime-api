const express = require('express')
const { authMiddleware } = require('../middlewares/index')
const { getAllCountries } = require('../controllers/countries-controller')
const {
  sendPasswordRecoveryMail,
  recoverPassword,
} = require('../controllers/password-recovery-controller')
const {
  register,
  login,
  confirmAccount,
} = require('../controllers/auth-controller')

const router = express.Router()

router.get('/countries', authMiddleware, getAllCountries)
router.post('/register', register)
router.post('/login', login)
router.post('/confirm-account', confirmAccount)
router.post('/password/send-recovery-link', sendPasswordRecoveryMail)
router.post('/password/recover', recoverPassword)

module.exports = router
