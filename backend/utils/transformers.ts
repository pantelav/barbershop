import { IUserData } from '../types/user'

export const userTransformer = (user: any): IUserData => {
  return {
    id: user._id || user.id,
    username: user.username,
    role: user.role
  }
}
