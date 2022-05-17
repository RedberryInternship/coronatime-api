import Joi from 'joi';

const recoverPasswordSchema = Joi.object({
  password: Joi.string().alphanum().min(3).max(20).required(),
  repeatPassword: Joi.ref('password'),
  hash: Joi.string().required(),
});

export default recoverPasswordSchema;
