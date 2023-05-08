import { IOrderSchema } from '../types/order'

export const checkStaffBody = (body: any): boolean => {
  if (!body?.name || !body?.role) return false
  if (body?.role === 'barber' || body?.role === 'moderator') return true
  return false
}

export const checkOrderBody = (body: IOrderSchema): boolean => {
  if (!body.name || !body.phone || !body.date) return false
  return true
}