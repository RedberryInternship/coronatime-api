import Joi from 'joi';
import { User } from '../models/index.js';

const userExistsWithSuchMail = async (email) => {
  const user = await User.findOne({ email });
  return (value, helpers) => {
    if (!user) {
      return helpers.message('there is no user with such email.');
    }
    return value;
  };
};

const sendPasswordRecoverySchema = async (data) => {
  const { email } = data;
  const userExistsRule = await userExistsWithSuchMail(email);
  return Joi.object({
    email: Joi.string().email().custom(userExistsRule).required(),
    backlink: Joi.string().required(),
  });
};

export default sendPasswordRecoverySchema;
