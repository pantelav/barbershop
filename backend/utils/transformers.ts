import { IStaff } from '../types/staff'
import { IUserData } from '../types/user'

export const userTransformer = (user: any): IUserData => {
  return {
    id: user._id || user.id,
    username: user.username,
    role: user.role
  }
}

export const staffTransformer = (users: any[]): IStaff[] => {
  const data: IStaff[] = []
  users.forEach(user => {
    const obj = {
      id: user._id.toString(),
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      gender: user.gender,
      workdays: user.workdays
    }
    data.push(obj)
  })
  return data
}