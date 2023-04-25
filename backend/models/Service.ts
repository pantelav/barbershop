import mongoose from 'mongoose'
import { IServiceSchema } from '../types/services'

const { Schema, model } = mongoose

const serviceSchema = new Schema<IServiceSchema>({
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
  }
})

export default model<IServiceSchema>("Service", serviceSchema)