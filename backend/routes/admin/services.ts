import express, { Router } from "express"
import ServicesControler from '../../controllers/admin/ServicesController'
const router: Router = express.Router()

router.get('/cs', ServicesControler.getCategoriesAndServices)

router.get('/category', ServicesControler.getCategories)
router.post('/category', ServicesControler.createCategory)
router.put('/category', ServicesControler.editCategory)
router.delete('/category', ServicesControler.deleteCategory)

router.get('/service', ServicesControler.getServices)
router.post('/service', ServicesControler.createService)
router.put('/service', ServicesControler.editService)
router.delete('/service', ServicesControler.deleteService)

export default router