import Joi from 'joi';
import { User } from '../models/index.js';

const determineIfUserExists = (user) => (value, helpers) => {
  if (!user) {
    return helpers.message('there is no user with this username');
  }
  return value;
};

const loginSchema = async (data) => {
  const user = await User.findOne({ username: data.username });

  return Joi.object({
    username: Joi.string()
      .alphanum()
      .custom(determineIfUserExists(user))
      .required(),
    password: Joi.string().required(),
  });
};

export default loginSchema;
