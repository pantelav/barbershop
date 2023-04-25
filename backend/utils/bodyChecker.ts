export const checkStaffBody = (body: any): boolean => {
  if (!body?.name || !body?.role) return false
  if (body?.role === 'barber' || body?.role === 'moderator') return true
  return false
}