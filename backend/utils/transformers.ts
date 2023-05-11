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
      workdays: user.workdays,
      avatar: user.avatar
    }
    data.push(obj)
  })
  return data
}

export const staffBodyTransformer = (body: any) => {
  if (body?.workdays && typeof body.workdays === 'string') {
    const arr = body.workdays.split(',')
    body.workdays = arr.map((value: string) => parseInt(value))
  }
  if (body?.isActive && typeof body.isActive === 'string') {
    body.isActive = Boolean(body.isActive)
  }
  return body
}