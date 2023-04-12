import mongoose from 'mongoose'

const { Schema, model } = mongoose

interface IBarber {
  name: string,
  description: string,
  avatar: string,
  isActive: boolean
}

const barberSchema = new Schema<IBarber>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  avatar: String,
  isActive: {
    type: Boolean,
    default: true
  }
})

export default model<IBarber>("Barber", barberSchema)