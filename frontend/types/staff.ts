export interface IStaff {
  _id: string,
  gender: 'm' | 'f',
  isActive: boolean,
  name: string,
  role: 'barber' | 'moderator',
  avatar: string,
  workdays: number[]
}