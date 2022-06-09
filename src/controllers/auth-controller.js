import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendConfirmAccountMail } from '../mail/index.js'
import { AccountVerification, User } from '../models/index.js'
import { registrationSchema, authorizationSchema } from '../schemas/index.js'

export const register = async (req, res) => {
  const { body } = req
  const validator = await registrationSchema(body)
  const { value: data, error } = validator.validate(body)

  if (error) {
    return res.status(422).json(error.details)
  }

  const { username, email, password, redirectOnConfirm } = data
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    confirmed: false,
  })

  const verificationHash = crypto.randomBytes(48).toString('hex')

  await AccountVerification.create({
    hash: verificationHash,
    user: user._id,
  })

  await sendConfirmAccountMail({
    to: email,
    hash: verificationHash,
    backLink: redirectOnConfirm,
  })

  res.status(201).send()
}

export const login = async (req, res) => {
  const { body } = req
  const validator = await authorizationSchema(body)
  const { value: data, error } = validator.validate(body)

  if (error) {
    return res.status(422).json(error.details)
  }

  const { username, password } = data

  const user = await User.findOne({ username }).select('+password')
  const result = await bcrypt.compare(password, user.password)

  if (result) {
    const signData = {
      username: user.username,
      email: user.email,
    }
    const token = jwt.sign(signData, process.env.JWT_SECRET)
    res.json({ token })
  } else {
    res.status(401).json({ message: 'please, provide correct credentials...' })
  }
}

export const confirmAccount = async (req, res) => {
  const { hash } = req.body

  if (!hash) {
    res.status(401).send()
  } else {
    const accountVerification = await AccountVerification.findOne({ hash })
    if (!accountVerification) {
      res.status(401).send()
      return
    }
    await accountVerification.populate('user')

    if (accountVerification.user.confirmed) {
      res.status(401).send()
    } else {
      accountVerification.user.confirmed = true
      await accountVerification.user.save()
      await accountVerification.delete()

      res.json({
        success: true,
      })
    }
  }
}
