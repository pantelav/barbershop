export interface IStaff {
  _id: string,
  gender: 'm' | 'f',
  isActive: boolean,
  name: string,
  role: 'barber' | 'moderator',
  avatar: string,
  workdays: number[]
}

export interface IBarber {
  id: string,
  gender: 'm' | 'f',
  name: string,
  avatar?: string,
  workdays: number[]
}