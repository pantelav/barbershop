import { Router } from 'express';

import auth from './client/auth'
import adminAuth from './admin/auth'
import adminServices from './admin/services'
import adminStaff from './admin/staff'
import adminOrders from './admin/orders'

import clientBarbers from './client/barbers'
import clientServices from './client/services'
import clientOrder from './client/order'

const rootRouter = Router()

rootRouter.use('/admin', adminAuth)
rootRouter.use('/admin', adminServices)
rootRouter.use('/admin', adminStaff)
rootRouter.use('/admin', adminOrders)

rootRouter.use('/', auth)
rootRouter.use('/', clientBarbers)
rootRouter.use('/', clientServices)
rootRouter.use('/', clientOrder)

export default rootRouter