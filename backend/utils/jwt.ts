import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { IUserData } from '../types/user'
import { userTransformer } from './transformers'
import Admin from '../models/Admin'


export const generateAccessToken = (payload: IUserData): string => {
  const token = jwt.sign(payload, process.env.AJWT as string, { expiresIn: '1h' })
  return token
}

export const generateRefreshToken = (payload: IUserData): string => {
  const token = jwt.sign(payload, process.env.RJWT as string, { expiresIn: '30d' })
  return token
}

export const decodeAccessToken = (token: string) => {
  if (!token) return
  return jwt.verify(token, process.env.AJWT as string) as jwt.JwtPayload
}

export const decodeRefreshToken = (token: string) => {
  if (!token) return
  return jwt.verify(token, process.env.RJWT as string) as jwt.JwtPayload
}

export const parseToken = (req: Request) => {
  return req.headers.authorization?.split(' ')[1]
}

export const generateTokens = async (cookieRefresh: string) => {
  let accessToken, refreshToken, errorToken
  try {
    if (!cookieRefresh) throw new Error()
    const userData = userTransformer(decodeRefreshToken(cookieRefresh))
    const newAccess = generateAccessToken(userData)
    const newRefresh = generateRefreshToken(userData)
    const user = await Admin.findByIdAndUpdate(userData.id, { refresh: cookieRefresh })
    if (!user) throw new Error()
    accessToken = newAccess
    refreshToken = newRefresh
  } catch (error) {
    errorToken = error
  } finally {
    return { accessToken, refreshToken, errorToken }
  }
}