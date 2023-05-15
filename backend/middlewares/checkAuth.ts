import { Request, Response, NextFunction } from 'express'
import { decodeAccessToken, generateTokens, parseToken } from "../utils/jwt"
import { REFRESH_AGE } from '../constants'

export const verifyAccess = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = parseToken(req)
  const cookieRefresh = req.cookies?.refresh
  if (!accessToken || !cookieRefresh) return res.status(403).json({ message: "Ошибка авторизации" })
  try {
    const decoded = decodeAccessToken(accessToken)
    if (!decoded) return res.status(403).json({ message: "Неверный токен доступа" })
    req.body.user = decoded
    next()
  } catch (error: any) {
    if (error?.name.includes('Token')) {
      const tokens = await generateTokens(cookieRefresh)
      if (tokens.errorToken || !tokens.accessToken || !tokens.refreshToken) {
        return res.status(403).json({ message: "Не авторизован" })
      }
      res.cookie('refresh', tokens.refreshToken, { maxAge: REFRESH_AGE, httpOnly: true })
      req.body.bearer = tokens.accessToken
      next()
    } else {
      console.log(error.name);
      return res.status(500).json({ message: "Ошибка сервера" })
    }
  }
}

function getRole (req: Request): string | false {
  const token = parseToken(req)
  if (!token) return false
  const decoded = decodeAccessToken(token)
  if (!decoded) return false
  const { role } = decoded
  return role
}

export const checkBarber = (req: Request, res: Response, next: NextFunction) => {
  const role = getRole(req)
  if (role === 'barber') next()
  return res.status(403).json({ message: "У вас недостаточно прав" })
}

export const checkModerator = (req: Request, res: Response, next: NextFunction) => {
  const role = getRole(req)
  if (role === 'moderator') next()
  return res.status(403).json({ message: "У вас недостаточно прав" })
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = getRole(req)
  if (role === 'admin') next()
  return res.status(403).json({ message: "У вас недостаточно прав" })
}

export const checkAdminOrModerator = (req: Request, res: Response, next: NextFunction) => {
  const role = getRole(req)
  if (role === 'admin' || role === 'moderator') next()
  return res.status(403).json({ message: "У вас недостаточно прав" })
}