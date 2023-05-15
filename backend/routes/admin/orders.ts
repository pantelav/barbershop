import express, { Router } from "express"
import OrdersController from '../../controllers/admin/OrdersController'
import { verifyAccess } from '../../middlewares/checkAuth'
const router: Router = express.Router()
const endpoint = '/orders'

router.use(verifyAccess)
router.get(endpoint, OrdersController.getOrders)
router.post(endpoint, OrdersController.createOrder)
router.put(endpoint, OrdersController.editOrder)
router.delete(endpoint, OrdersController.deleteOrder)
router.get(endpoint + '/times', OrdersController.getTimes)

export default router