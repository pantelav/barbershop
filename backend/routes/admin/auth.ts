import express, { Router } from "express"
import AdminAuthController from '../../controllers/admin/AdminAuthController'
import { checkAdmin, checkAdminOrModerator } from '../../middlewares/checkAuth'

const router: Router = express.Router()

router.post('/login', AdminAuthController.login)
router.post('/reg/barber', checkAdminOrModerator, AdminAuthController.registerBarber)
router.post('/reg/moderator', checkAdmin, AdminAuthController.registerModerator)
router.post('/reg/admin', checkAdmin, AdminAuthController.registerAdmin)
router.get('/logout', AdminAuthController.logout)
router.get('/refresh', AdminAuthController.generateTokens)

export default router