import Joi from 'joi'

const recoverPasswordSchema = Joi.object({
  password: Joi.string().alphanum().required().messages({
    'string.base': 'password field is required',
    'string.alphanum': 'password field should be alphanumeric.',
    'any.required': 'password field is required.',
  }),
  repeatPassword: Joi.ref('password'),
  hash: Joi.string().required().messages({
    'string.base': 'hash field should be string.',
    'any.required': 'hash field is required.',
  }),
})

export default recoverPasswordSchema
