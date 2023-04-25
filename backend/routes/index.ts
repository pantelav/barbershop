import { Router } from 'express';

import auth from './user/auth'
import adminAuth from './admin/auth'
import adminServices from './admin/services'
import adminStaff from './admin/staff'

const rootRouter = Router()

rootRouter.use('/', auth)
rootRouter.use('/admin', adminAuth)
rootRouter.use('/admin', adminServices)
rootRouter.use('/admin', adminStaff)

export default rootRouter