import { Request, Response } from 'express';
import Order from '../../models/Order';
import { checkOrderBody } from '../../utils/bodyChecker';
import { generateTimes } from '../../utils/generateTimes';

export default class OrdersController {
  static async getOrders (req: Request, res: Response) {
    try {
      const orders = await Order.find()
      orders.forEach(order => {
        const date = new Date(order.date)
        // @ts-ignore
        order.date = date
      })
      
      return res.json({data: orders, bearer: req.body?.bearer})
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async createOrder (req: Request, res: Response) {
    try {
      const body = req.body
      if (!checkOrderBody(body)) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.create(body)
      return res.status(201).json({ message: "Заказ оформлен", bearer: req.body?.bearer })
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
      return res.json({ message: "Заказ изменен", bearer: req.body?.bearer })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async deleteOrder (req: Request, res: Response) {
    try {
      const { id } = req.query
      if (!id) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.findByIdAndDelete(id)
      return res.json({ message: "Заказ удален", bearer: req.body?.bearer })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
  static async getTimes (req: Request, res: Response) {
    try {
      let { barberId, date } = req.query
      if (!barberId || !date || typeof barberId !== 'string' || typeof date !== 'string') return res.status(400).json({ message: 'Ошибка запроса' })
      const times = await generateTimes(barberId, date)
      res.json({ data: times, bearer: req.body?.bearer })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}