export const endpoints = {
  admin: {
    all: '/admin/cs',
    category: '/admin/category',
    service: '/admin/service',
    staff: '/admin/staff',
    barbers: '/admin/barbers',
    orders: '/admin/orders',
    times: '/admin/orders/times',
    login: '/admin/login',
    regBarber: '/admin/reg/barber',
    regModerator: '/admin/reg/moderator',
    logout: '/admin/logout',
    tokens: '/admin/refresh',
    verify: '/admin/verify'
  },
  client: {
    barbers: '/barbers',
    services: '/services',
    times: '/times',
    order: '/order'
  }
}