import mongoose, { Types } from 'mongoose'
import { IUserModel } from '../types/user'

const { Schema, model } = mongoose

const userSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  refresh: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: false
  }
})

export default model<IUserModel>("User", userSchema)