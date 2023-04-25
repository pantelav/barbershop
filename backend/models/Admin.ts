import mongoose from 'mongoose'
import { IAdminSchema } from '../types/admin'

const { Schema, model } = mongoose


const adminSchema = new Schema<IAdminSchema>({
  login: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'barber',
    enum: ['admin', 'moderator', 'barber']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  refresh: String,
})

export default model<IAdminSchema>("Admin", adminSchema)