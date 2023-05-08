import mongoose from 'mongoose'
import { IStaffSchema } from '../types/staff'

const { Schema, model } = mongoose


const staffSchema = new Schema<IStaffSchema>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  avatar: String,
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['barber', 'moderator'],
    default: 'moderator'
  },
  gender: {
    type: String,
    enum: ['m', 'f'],
    default: 'm',
  },
  workdays: {
    type: [Number],
    enum: [0, 1, 2, 3, 4, 5, 6]
  }
})

export default model<IStaffSchema>("Staff", staffSchema)