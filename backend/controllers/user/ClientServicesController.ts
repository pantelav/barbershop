import Category from '../../models/Category';
import Service from '../../models/Service';
import { generateTimes } from '../../utils/generateTimes';
import { servicesTransformer } from '../../utils/transformers';
import { Request, Response } from 'express';

export default class ClientServicesController {
  static async getCategoriesAndServices (req: Request, res: Response) {
    try {
      const servicesDb = await Service.find()
      const categoriesDb = await Category.find()
      const categories = servicesTransformer(categoriesDb, servicesDb)
      return res.json(categories)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
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