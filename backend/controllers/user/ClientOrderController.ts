import { Request, Response } from 'express';
import { checkOrderBody } from '../../utils/bodyChecker';
import Order from '../../models/Order';

export default class ClientOrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const body = req.body
      if (!checkOrderBody(body)) return res.status(400).json({ message: 'Ошибка запроса' })
      await Order.create(body)
      return res.status(201).json({ message: "Заказ оформлен" })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}