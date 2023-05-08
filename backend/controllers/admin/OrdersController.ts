import { Request, Response } from 'express';
import Order from '../../models/Order';
import { checkOrderBody } from '../../utils/bodyChecker';

export default class OrdersController {
  static async getOrders (req: Request, res: Response) {
    try {
      const orders = await Order.find()
      orders.forEach(order => {
        const date = new Date(order.date)
        // @ts-ignore
        order.date = date
      })
      return res.json(orders)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async createOrder (req: Request, res: Response) {
    try {
      const body = req.body
      if (!checkOrderBody(body)) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.create(body)
      return res.status(201).json({ message: "Заказ оформлен" })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async editOrder (req: Request, res: Response) {
    try {
      const body = req.body
      const { id } = req.query
      if (!checkOrderBody(body) || !id) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.findByIdAndUpdate(id, body)
      return res.json({ message: "Заказ изменен" })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async deleteOrder (req: Request, res: Response) {
    try {
      const { id } = req.query
      if (!id) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.findByIdAndDelete(id)
      return res.json({ message: "Заказ удален" })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

}