import mongoose from 'mongoose'
import { ICategorySchema } from '../types/services'

const { Schema, model } = mongoose

const categorySchema = new Schema<ICategorySchema>({
  title: {
    required: true,
    type: String
  },
  picture: String
})

export default model("Category", categorySchema)