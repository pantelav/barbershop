import { Types } from 'mongoose'

export interface IUserData {
  id: string,
  username: string,
  role: string
}

export interface IUserModel {
  username: string,
  email: string,
  hash: string,
  history: Types.ObjectId[],
  refresh: string[],
  active: boolean,
  role: string
}