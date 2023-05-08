import express, { Router } from "express"
import OrdersController from '../../controllers/admin/OrdersController'
const router: Router = express.Router()
const endpoint = '/orders'

router.get(endpoint, OrdersController.getOrders)
router.post(endpoint, OrdersController.createOrder)
router.put(endpoint, OrdersController.editOrder)
router.delete(endpoint, OrdersController.deleteOrder)
router.get(endpoint + '/times', OrdersController.getTimes)

export default router