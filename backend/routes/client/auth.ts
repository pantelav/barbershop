import express, { Router } from "express"
import UserAuthController from '../../controllers/user/UserAuthController'

const router: Router = express.Router()

router.post('/login', UserAuthController.loginUser)
router.post('/register', UserAuthController.registerUser)
router.get('/logout', UserAuthController.logoutUser)
router.get('/refresh', UserAuthController.generateTokens)

router.get('/confirm/:id', (req, res) => {

})

router.get('/test', (req, res) => {
  res.json({ message: req.headers['x-forwarded-for'] || req.connection.remoteAddress })
  console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
})
export default router