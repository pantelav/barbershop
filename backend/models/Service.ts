import mongoose from 'mongoose'
import { IServiceSchema } from '../types/services'

const { Schema, model } = mongoose

export const serviceSchema = new Schema<IServiceSchema>({
  title: {
    type: String,
    required: true
  },
  description: String,
  picture: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  duration: {
    type: Number,
    default: 60
  }
})

export default model<IServiceSchema>("Service", serviceSchema)