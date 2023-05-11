import { Schema, Types } from 'mongoose'

type dbId = typeof Schema.Types.ObjectId | Types.ObjectId | string | object

export interface IServiceSchema {
  title: string,
  description?: string,
  picture?: string,
  price: number,
  category: dbId,
  duration: number
}

export interface IServiceDb extends IServiceSchema {
  _id: dbId
}

export interface IService extends IServiceSchema {
  id: dbId
}

export interface ICategory {
  id: dbId,
  title: string,
  services?: IService[]
}