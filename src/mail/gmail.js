const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const gmailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

module.exports = gmailTransport
