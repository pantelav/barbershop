import express, { Router } from 'express';
import ClientStaffController from '../../controllers/user/ClientStaffController';

const router: Router = express.Router()

router.get('/barbers', ClientStaffController.getBarbers)

export default router