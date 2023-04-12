import mongoose, { Types } from 'mongoose'

const { Schema, model } = mongoose

interface IOrder {
  user: Types.ObjectId,
  comment: string,
  barber: Types.ObjectId,
  date: Date,
  status: string,
  price: number
}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: String,
  barber: {
    type: Schema.Types.ObjectId,
    ref: "Baber",
    require: true,
  },
  date: Date,
  status: {
    type: String,
    default: 'active'
  },
  price: {
    type: Number,
    require: true
  }
})

export default model<IOrder>("Order", orderSchema)