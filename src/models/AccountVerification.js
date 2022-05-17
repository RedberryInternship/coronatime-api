import mongoose from 'mongoose';

const { Schema } = mongoose;

const accountVerificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hash: Schema.Types.String,
});

const AccountVerification = mongoose.model(
  'accountVerification',
  accountVerificationSchema
);

export default AccountVerification;
