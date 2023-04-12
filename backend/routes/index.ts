import { Router } from 'express';

import auth from './user/auth'
import adminAuth from './admin/auth'

const rootRouter = Router()

rootRouter.use('/', auth)
rootRouter.use('/admin', adminAuth)

export default rootRouter