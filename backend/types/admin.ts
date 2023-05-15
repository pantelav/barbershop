import { Types } from 'mongoose'

export type Roles = 'admin' | 'moderator' | 'barber'

export interface IAdminSchema {
  login: string,
  username: string,
  hash: string,
  role: Roles,
  isActive: boolean,
  refresh: string,
}

export interface IAdminDb extends IAdminSchema {
  _id: Types.ObjectId | any
}
