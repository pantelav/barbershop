import { Types } from 'mongoose'

export type StaffRoles = 'barber' | 'moderator'

export interface IStaffSchema {
  name: string,
  role: StaffRoles,
  isActive: boolean,
  gender: string,
  avatar?: string,
  description?: string,
  workdays: number[]
}

export interface IStaffDb extends IStaffSchema {
  _id: Types.ObjectId
}

export interface IStaff extends IStaffSchema {
  id: string
}