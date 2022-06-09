const Joi = require('joi')
const { User } = require('../models/index')

const userExistsWithSuchMail = async (email) => {
  const user = await User.findOne({ email })
  return (value, helpers) => {
    if (!user) {
      return helpers.message('there is no user with such email.')
    }
    return value
  }
}

const sendPasswordRecoverySchema = async (data) => {
  const { email } = data
  const userExistsRule = await userExistsWithSuchMail(email)
  return Joi.object({
    email: Joi.string().email().custom(userExistsRule).required().messages({
      'string.base': 'email field should be string.',
      'string.email': 'email field should have email structure.',
      'any.required': 'email field is required',
    }),
    backlink: Joi.string().required().messages({
      'string.base': 'backlink field should be string.',
      'string.required': 'backlink field is required.',
    }),
  })
}

module.exports = sendPasswordRecoverySchema
