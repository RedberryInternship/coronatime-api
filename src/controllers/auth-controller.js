import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registrationSchema, authorizationSchema } from '../schemas/index.js';

export const register = async (req, res) => {
  const { body } = req;
  const validator = await registrationSchema(body);
  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { username, email, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).send();
};

export const login = async (req, res) => {
  const { body } = req;
  const validator = await authorizationSchema(body);
  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { username, password } = data;

  const user = await User.findOne({ username }).select('+password');
  const result = await bcrypt.compare(password, user.password);

  if (result) {
    const signData = {
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(signData, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'please, provide correct credentials...' });
  }
};
