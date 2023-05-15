import express, { Router, Request, Response } from "express"
import AdminAuthController from '../../controllers/admin/AdminAuthController'
import { checkAdmin, checkAdminOrModerator, verifyAccess } from '../../middlewares/checkAuth'

const router: Router = express.Router()

router.post('/login', AdminAuthController.login)
router.post('/reg/barber', checkAdminOrModerator, AdminAuthController.registerBarber)
router.post('/reg/moderator', checkAdmin, AdminAuthController.registerModerator)
router.post('/reg/admin', checkAdmin, AdminAuthController.registerAdmin)
router.get('/logout', AdminAuthController.logout)
router.get('/refresh', AdminAuthController.generateTokens)
router.get('/verify', verifyAccess, (req: Request, res: Response) => {
  const body = req.body.user
  return res.json(body)
})

export default router