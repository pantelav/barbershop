export type Roles = 'admin' | 'moderator' | 'barber'

export interface IAdmin {
  login: string,
  username: string,
  hash: string,
  role: Roles,
  isActive: boolean,
  refresh: string
}
