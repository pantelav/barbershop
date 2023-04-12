import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import { decodeAccessToken, parseToken } from "../utils/jwt"

export const verifyAccess = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = parseToken(req)

  if (!accessToken) return res.status(403).json({ message: "Ошибка авторизации" })
  try {
    const decoded = decodeAccessToken(accessToken)
    if (!decoded) return res.status(403).json({ message: "Неверный токен доступа" })
    req.body.user = decoded
    next()
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Срок давности токена доступа истек" })
    } else {
      console.log(error);
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