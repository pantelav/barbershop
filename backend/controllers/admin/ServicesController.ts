import { Request, Response, NextFunction } from 'express'
import Category from '../../models/Category'
import Service from '../../models/Service'
import { ICategory, IService, IServiceSchema } from '../../types/services'
import { servicesTransformer } from '../../utils/transformers'

export default class ServicesControler {
  static async getCategoriesAndServices (req: Request, res: Response) {
    try {
      const servicesDb = await Service.find()
      const categoriesDb = await Category.find()
      const categories = servicesTransformer(categoriesDb, servicesDb)
      return res.json({ data: categories, bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }
  static async getCategories (req: Request, res: Response) {
    try {
      const categoriesDb = await Category.find()
      const categories: ICategory[] = []
      categoriesDb.forEach(item => {
        const obj = {
          id: item._id,
          title: item.title
        }
        categories.push(obj)
      })
      return res.json({ data: categories, bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async createCategory (req: Request, res: Response) {
    try {
      const { title } = req?.body
      if (!title) return res.status(400).json({ message: "Все поля обязательные" })
      await Category.create({ title })
      return res.status(201).json({ message: "Категория создана", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async editCategory (req: Request, res: Response) {
    try {
      const { id } = req?.query
      const { title } = req?.body
      if (!id || !title) return res.status(400).json({ message: "Ошибка запроса" })
      await Category.findByIdAndUpdate(id, { title })
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.json({ message: "Категория изменена", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async deleteCategory (req: Request, res: Response) {
    try {
      const { id } = req?.query
      if (!id) return res.status(400).json({ message: "Ошибка запроса" })
      await Category.findByIdAndDelete(id)
      await Service.deleteMany({ category: id })
      return res.json({ message: "Категория удалена", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async getServices (req: Request, res: Response) {
    try {
      const services = await Service.find()
      return res.json({ data: services, bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async createService (req: Request, res: Response) {
    try {
      const serviceData: IServiceSchema = req?.body
      if (!serviceData.title || !serviceData.category || !serviceData.price) return res.status(400).json({ message: "Все поля обязательные" })
      await Service.create({ ...serviceData })
      return res.status(201).json({ message: "Услуга создана", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async editService (req: Request, res: Response) {
    try {
      const { id } = req?.query
      const serviceData: IServiceSchema = req?.body
      if (!id || !serviceData.title || !serviceData.category || !serviceData.price) return res.status(400).json({ message: "Ошибка запроса" })
      await Service.findByIdAndUpdate(id, { ...serviceData })
      return res.json({ message: "Услуга изменена", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async deleteService (req: Request, res: Response) {
    try {
      const { id } = req?.query
      if (!id) return res.status(400).json({ message: "Ошибка запроса" })
      await Service.findByIdAndDelete(id)
      return res.json({ message: "Услуга удалена", bearer: req.body?.bearer })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

}