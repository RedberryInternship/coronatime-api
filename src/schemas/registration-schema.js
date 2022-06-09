const Joi = require('joi')
const { User } = require('../models/index')

const usernameShouldBeUniqueRule = (user) => (value, helper) => {
  if (!user) {
    return value
  }
  if (user.username === value) {
    return helper.message('this username is already taken.')
  }
  return value
}

const emailIsAlreadyTaken = (user) => (value, helper) => {
  if (!user) {
    return value
  }

  if (user.email === value) {
    return helper.message('this email is already taken.')
  }
  return value
}

const registerSchema = async (data) => {
  const foundUserWithUsername = await User.findOne({ username: data.username })
  const foundUserWithEmail = await User.findOne({ email: data.email })

  return Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .custom(
        usernameShouldBeUniqueRule(foundUserWithUsername),
        'unique username'
      )
      .required()
      .messages({
        'string.base': 'username field should be string.',
        'string.min': 'username field should be at lease 3 characters long.',
        'string.max': 'username field should be maximum 30 characters long.',
        'any.required': 'username field is required.',
      }),
    email: Joi.string()
      .email()
      .custom(emailIsAlreadyTaken(foundUserWithEmail), 'unique email')
      .required()
      .messages({
        'string.base': 'email field should be string.',
        'string.email': 'email field should have valid email structure.',
        'any.required': 'email field is required.',
      }),
    password: Joi.string().alphanum().required().messages({
      'string.base': 'password field should be string.',
      'string.alphanum': 'password field should be alphanumeric.',
      'any.required': 'password filed is required.',
    }),
    repeatPassword: Joi.ref('password'),
    redirectOnConfirm: Joi.string().required().messages({
      'string.base': 'redirectOnConfirm field should be string.',
      'any.required': 'redirectOnConfirm field is required.',
    }),
  })
}

module.exports = registerSchema
