import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from "../../utils/jwt"
import { registerMail } from '../../utils/mail';
import { userTransformer } from '../../utils/transformers'
import { REFRESH_AGE, SALT } from '../../constants';

export default class UserAuthController {

  static async registerUser (req: Request, res: Response) {
    const { email, password, repeatPassword, username } = req?.body
    if (!email || !password || !repeatPassword || !username) {
      return res.status(400).json({ message: "Все поля обязательные" })
    }
    if (password !== repeatPassword) return res.status(400).json({ message: "Пароли не совпадают" })

    try {
      const checkUser = await User.findOne({ email })
      if (checkUser) return res.status(409).json({ message: "Пользователь с таким email уже существует" })

      const hashPassword = await bcrypt.hash(password, SALT)
      const newUser = await User.create({
        username,
        email,
        hash: hashPassword,
      })

      const transformedUser = userTransformer(newUser)
      const accessToken = generateAccessToken(transformedUser)
      const refreshToken = generateRefreshToken(transformedUser)
      await User.findByIdAndUpdate(newUser._id, { $push: { refresh: refreshToken } })
      res.cookie('refresh', refreshToken, { maxAge: REFRESH_AGE, httpOnly: true })

      // TODO: Отправить на почту подтверждение
      // await registerMail(newUser._id, newUser.email, newUser.username)
      return res.status(201).json({ message: "Пользователь создан", accessToken, username })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async loginUser (req: Request, res: Response) {
    if (req.cookies?.refresh) return res.status(409).json({ message: "Вы уже авторизованы" })
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: "Все поля обязательны для ввода" })

    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: "Неверный email или пароль" })

      const checkPassword = await bcrypt.compare(password, user.hash)
      if (!checkPassword) return res.status(400).json({ message: "Неверный email или пароль" })

      const transformedUser = userTransformer(user)
      const accessToken = generateAccessToken(transformedUser)
      const refreshToken = generateRefreshToken(transformedUser)

      await User.findByIdAndUpdate(user._id, { $push: { refresh: refreshToken } })
      res.cookie('refresh', refreshToken, { maxAge: REFRESH_AGE, httpOnly: true })

      return res.json({ accessToken, username: user.username })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async logoutUser (req: Request, res: Response) {
    const refreshToken = req.cookies.refresh
    if (!refreshToken) res.status(400).json({ message: "Вы не авторизованы" })
    try {
      const userData = decodeRefreshToken(refreshToken)
      const user = await User.findByIdAndUpdate(userData.id, { $pull: { refresh: refreshToken } })
      if (!user) return res.status(400).json({ message: "Вы не авторизованы" })
      res.clearCookie('refresh')
      return res.json({ message: "Logout" })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

  static async generateTokens (req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh
    if (!refreshToken) res.status(403).json({ message: "Вы не авторизованы" })
    try {
      const userData = userTransformer(decodeRefreshToken(refreshToken))
      const newAccess = generateAccessToken(userData)
      const newRefresh = generateRefreshToken(userData)
      const user = await User.findByIdAndUpdate(userData.id, { $pull: { refresh: refreshToken } })
      if (!user) return res.status(400).json({ message: "Вы не авторизованы" })
      await User.findByIdAndUpdate(userData.id, { $push: { refresh: newRefresh } })
      res.cookie('refresh', newRefresh, { maxAge: REFRESH_AGE, httpOnly: true })
      res.json({ accessToken: newAccess })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }

}

export const getUser = async (req: Request, res: Response) => {
  const userId = req.body?.userId
  if (!userId) {
    return res.status(400).json({ message: "ID пользователя обязателен" })
  }

  try {
    const user = await User.findById(userId)
    return res.json(user)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ошибка сервера" })
  }
}

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ошибка сервера" })
  }
}
