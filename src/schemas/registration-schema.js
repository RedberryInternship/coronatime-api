import Joi from 'joi';
import { User } from '../models/index.js';

const usernameShouldBeUniqueRule = (user) => (value, helper) => {
  if (!user) {
    return value;
  }
  if (user.username === value) {
    return helper.message('this username is already taken');
  }
  return value;
};

const emailIsAlreadyTaken = (user) => (value, helper) => {
  if (!user) {
    return value;
  }

  if (user.email === value) {
    return helper.message('this email is already taken');
  }
  return value;
};

const registerSchema = async (data) => {
  const foundUserWithUsername = await User.findOne({ username: data.username });
  const foundUserWithEmail = await User.findOne({ email: data.email });

  return Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .custom(
        usernameShouldBeUniqueRule(foundUserWithUsername),
        'unique username'
      )
      .required(),
    email: Joi.string()
      .email()
      .custom(emailIsAlreadyTaken(foundUserWithEmail), 'unique email')
      .required(),
    password: Joi.string().alphanum().required(),
    repeatPassword: Joi.ref('password'),
  });
};

export default registerSchema;
