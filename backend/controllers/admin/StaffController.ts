import { Request, Response, NextFunction } from 'express'
import { staffTransformer } from '../../utils/transformers';
import Staff from '../../models/Staff';
import { checkStaffBody } from '../../utils/bodyChecker';

export default class StaffController {
  static async getStaff (req: Request, res: Response) {
    try {
      const staffDb = await Staff.find()
      if (!staffDb.length) return res.json({ message: 'Нет записей' })
      const staff = staffTransformer(staffDb)
      return res.json({ ...staff })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async createUser (req: Request, res: Response) {
    try {
      const body = req.body
      if (!checkStaffBody(body)) return res.status(400).json({ message: 'Ошибка запроса' })
      await Staff.create({ ...body })
      return res.status(201).json({ message: 'Сотрудник добавлен' })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async editUser (req: Request, res: Response) {
    try {
      const { id } = req.query
      const body = req.body
      if (!checkStaffBody(body) || !id) return res.status(400).json({ message: 'Ошибка запроса' })
      await Staff.findByIdAndUpdate(id, { ...body })
      return res.status(201).json({ message: 'Сотрудник изменен' })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  static async deleteUser (req: Request, res: Response) {
    try {
      const { id } = req.query
      if (!id) return res.status(400).json({ message: 'Ошибка запроса' })
      await Staff.findByIdAndDelete(id)
      return res.status(201).json({ message: 'Сотрудник удален' })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}