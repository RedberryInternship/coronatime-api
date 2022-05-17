import mongoose from 'mongoose';

const { Schema } = mongoose;

const passwordRecoverySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hash: Schema.Types.String,
});

const PasswordRecovery = mongoose.model(
  'PasswordRecovery',
  passwordRecoverySchema
);

export default PasswordRecovery;
