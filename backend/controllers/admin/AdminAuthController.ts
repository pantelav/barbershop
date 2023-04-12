import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from "../../utils/jwt"
import Admin from '../../models/Admin';
import { REFRESH_AGE, SALT } from '../../constants';
import { userTransformer } from '../../utils/transformers';
import { Roles } from '../../types/admin';

export default class AdminAuthController {
  static async login (req: Request, res: Response) {
    const { login, password } = req?.body
    if (!login || !password) return res.status(400).json({ message: "Все поля обязательные" })
    try {
      const admin = await Admin.findOne({ login })
      if (!admin) return res.status(400).json({ message: "Неправильный логин или пароль" })
      const checkPassword = await bcrypt.compare(password, admin?.hash)
      if (!checkPassword) res.status(400).json({ message: "Неправильный логин или пароль" })

      const transformedUser = userTransformer(admin)
      const adminToken = generateAccessToken(transformedUser)
      const refreshToken = generateRefreshToken(transformedUser)

      await Admin.findByIdAndUpdate(admin._id, { refresh: refreshToken })
      res.cookie('refreshAdmin', refreshToken, { maxAge: REFRESH_AGE, httpOnly: true })
      return res.json({ adminToken, username: admin.username })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  private static async createAdmin (req: Request, res: Response, role: Roles = 'barber') {
    const { login, username, password, repeatPassword } = req?.body
    if (!login || !username || !password || !repeatPassword) return res.status(400).json({ message: "Все поля обязательные" })
    if (password !== repeatPassword) return res.status(400).json({ message: "Пароли не совпадают" })
    try {
      const adminDb = await Admin.findOne({ login })
      if (adminDb) return res.status(409).json({ message: "Пользователь с таким логином уже существует" })
      const hash = await bcrypt.hash(password, SALT)
      await Admin.create({
        login,
        username,
        hash,
        role
      })
      return res.status(201).json({ message: "Пользователь создан" })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async registerBarber (req: Request, res: Response) {
    return await this.createAdmin(req, res)
  }

  static async registerModerator (req: Request, res: Response) {
    return await this.createAdmin(req, res, 'moderator')
  }

  static async registerAdmin (req: Request, res: Response) {
    return await this.createAdmin(req, res, 'admin')
  }

  static async deleteUser (req: Request, res: Response) {

  }

  static async changePassword (req: Request, res: Response) {

  }

  static async logout (req: Request, res: Response) {
    const refreshToken = req.cookies.refresh
    if (!refreshToken) res.status(400).json({ message: "Вы не авторизованы" })
    try {
      const userData = decodeRefreshToken(refreshToken)
      const user = await Admin.findByIdAndUpdate(userData.id, { refresh: '' })
      if (!user) return res.status(400).json({ message: "Вы не авторизованы" })
      res.clearCookie('refreshAdmin')
      return res.json({ message: "Logout" })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async generateTokens (req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshAdmin
    if (!refreshToken) res.status(403).json({ message: "Вы не авторизованы" })
    try {
      const userData = userTransformer(decodeRefreshToken(refreshToken))
      const newAccess = generateAccessToken(userData)
      const newRefresh = generateRefreshToken(userData)
      const user = await Admin.findByIdAndUpdate(userData.id, { refresh: refreshToken })
      if (!user) return res.status(400).json({ message: "Вы не авторизованы" })
      res.cookie('refreshAdmin', newRefresh, { maxAge: REFRESH_AGE, httpOnly: true })
      res.json({ adminToken: newAccess })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

}