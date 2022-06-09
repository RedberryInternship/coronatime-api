import Joi from 'joi'
import { User } from '../models/index.js'

const determineIfUserExists = (user) => (value, helpers) => {
  if (!user) {
    return helpers.message('there is no user with this username.')
  }
  return value
}

const loginSchema = async (data) => {
  const user = await User.findOne({ username: data.username })

  return Joi.object({
    username: Joi.string()
      .alphanum()
      .custom(determineIfUserExists(user))
      .required()
      .messages({
        'string.base': 'username field should be string.',
        'string.alphanum': 'username field should be alphanumeric.',
        'any.required': 'username field is required.',
      }),
    password: Joi.string().required().messages({
      'string.base': 'password field should be string.',
      'any.required': 'password field is required.',
    }),
  })
}

export default loginSchema
