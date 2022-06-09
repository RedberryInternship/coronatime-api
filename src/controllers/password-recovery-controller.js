const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { PasswordRecovery, User } = require('../models/index')
const { sendPasswordRecoveryLink } = require('../mail/index')
const {
  sendPasswordRecoverySchema,
  recoverPasswordSchema,
} = require('../schemas/index')

const sendPasswordRecoveryMail = async (req, res) => {
  const validator = await sendPasswordRecoverySchema(req.body)
  const { value: validated, error } = validator.validate(req.body)

  if (error) {
    res.status(422).json(error.details)
  } else {
    const { email, backlink } = validated
    const user = await User.findOne({ email })
    const passwordRecoveryHash = crypto.randomBytes(48).toString('hex')

    await PasswordRecovery.create({
      user: user._id,
      hash: passwordRecoveryHash,
    })

    await sendPasswordRecoveryLink({
      to: email,
      backlink,
      hash: passwordRecoveryHash,
    })

    res.status(200).send()
  }
}

const recoverPassword = async (req, res) => {
  const { value: validated, error } = recoverPasswordSchema.validate(req.body)

  if (error) {
    res.status(422).send(error.details)
  } else {
    const { password, hash } = validated

    const passwordRecoveryRecord = await PasswordRecovery.findOne({ hash })

    if (!passwordRecoveryRecord) {
      res.status(422).json({
        message: 'invalid data provided.',
      })
    } else {
      await passwordRecoveryRecord.populate('user')
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      passwordRecoveryRecord.user.password = hashedPassword
      await passwordRecoveryRecord.user.save()
      await passwordRecoveryRecord.delete()
      res.status(200).send()
    }
  }
}

module.exports = {
  sendPasswordRecoveryMail,
  recoverPassword,
}
