import mongoose from 'mongoose'

const { Schema, model } = mongoose

interface IService {
  title: string,
  description: string,
  picture: string,
  price: number
}

const serviceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true
  },
  description: String,
  picture: String,
  price: Number
})

export default model<IService>("Service", serviceSchema)