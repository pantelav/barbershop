import express, { Router } from 'express';
import ClientServicesController from '../../controllers/user/ClientServicesController';

const router: Router = express.Router()

router.get('/services', ClientServicesController.getCategoriesAndServices)
router.get('/times', ClientServicesController.getTimes)

export default router