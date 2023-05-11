import express, { Router } from "express"
import StaffController from '../../controllers/admin/StaffController'
import multer from 'multer'
import path from 'path'
import { uploadImage } from '../../middlewares/uploadImage'
const router: Router = express.Router()
const endpoint = '/staff'
const upload = multer({ dest: path.join(__dirname, '../../uploads') })

router.get(endpoint, StaffController.getStaff)
router.post(endpoint, upload.single('image'), uploadImage, StaffController.createUser)
router.put(endpoint, upload.single('image'), uploadImage, StaffController.editUser)
router.delete(endpoint, StaffController.deleteUser)
router.get('/barbers', StaffController.getBarbers)

export default router