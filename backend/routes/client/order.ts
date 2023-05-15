import express, { Router } from 'express';
import ClientOrderController from '../../controllers/user/ClientOrderController';

const router: Router = express.Router()

router.post('/order', ClientOrderController.createOrder)

export default router