import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: Schema.Types.String,
  email: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    select: false,
  },
  confirmed: Schema.Types.Boolean,
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
})

const User = mongoose.model('User', userSchema)

export default User
