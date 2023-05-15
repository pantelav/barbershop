import Staff from '../../models/Staff'
import { Request, Response } from 'express'
import { clientStaffTransformer } from '../../utils/transformers'

export default class ClientStaffController {
  static getBarbers = async (req: Request, res: Response) => {
    try {
      const data = await Staff.find({isActive: true, role: 'barber'})
      const barbers = clientStaffTransformer(data)
      res.json(barbers)
    } catch (error) {
      return res.status(500).json({message: 'Ошибка сервера'})
    }
  }
}