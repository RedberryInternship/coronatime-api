const mongoose = require('mongoose')

const { Schema } = mongoose

const accountVerificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hash: Schema.Types.String,
})

const AccountVerification = mongoose.model(
  'accountVerification',
  accountVerificationSchema
)

module.exports = AccountVerification
