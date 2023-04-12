import { Request } from 'express'
export default (req: Request) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}