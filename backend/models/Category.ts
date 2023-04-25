import mongoose from 'mongoose'

const { Schema, model } = mongoose

const categorySchema = new Schema({
  title: {
    required: true,
    type: String
  },
  picture: String
})

export default model("Category", categorySchema)