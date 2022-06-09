const registrationSchema = require('./registration-schema')
const authorizationSchema = require('./authorization-schema')
const sendPasswordRecoverySchema = require('./send-password-recovery-mail-schema')
const recoverPasswordSchema = require('./recover-password-schema')

module.exports = {
  registrationSchema,
  authorizationSchema,
  sendPasswordRecoverySchema,
  recoverPasswordSchema,
}
