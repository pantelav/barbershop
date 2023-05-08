import mongoose from 'mongoose'
import { serviceSchema } from './Service'
import { IOrderSchema } from '../types/order'
const { Schema, model } = mongoose


const orderSchema = new Schema<IOrderSchema>({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  services: {
    type: [serviceSchema]
  },
  comment: String,
  barber: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    require: true,
  },
  date: String,
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'resolved', 'rejected']
  },
  price: {
    type: Number,
    require: true
  }
})

export default model<IOrderSchema>("Order", orderSchema)