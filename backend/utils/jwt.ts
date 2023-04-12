import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { IUserData } from '../types/user'


export const generateAccessToken = (payload: IUserData): string => {
  const token = jwt.sign(payload, process.env.AJWT as string, { expiresIn: '1h' })
  return token
}

export const generateRefreshToken = (payload: IUserData): string => {
  const token = jwt.sign(payload, process.env.RJWT as string, { expiresIn: '30d' })
  return token
}

export const decodeAccessToken = (token: string) => {
  return jwt.verify(token, process.env.AJWT as string) as jwt.JwtPayload
}

export const decodeRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.RJWT as string) as jwt.JwtPayload
}

export const parseToken = (req: Request) => {
  return req.headers.authorization?.split(' ')[1]
}