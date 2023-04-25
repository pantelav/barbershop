import express, { Router } from "express"
import StaffController from '../../controllers/admin/StaffController'
const router: Router = express.Router()
const endpoint = '/staff'

router.get(endpoint, StaffController.getStaff)
router.post(endpoint, StaffController.createUser)
router.put(endpoint, StaffController.editUser)
router.delete(endpoint, StaffController.deleteUser)

export default router