import { Types } from 'mongoose';
import { IServiceSchema } from './services';

export interface IOrderSchema {
  name: string,
  phone: string,
  comment: string,
  barber: Types.ObjectId,
  services: IServiceSchema[],
  date: string,
  status: string,
  price: number
}

export interface IOrderClient extends IOrderSchema {
  id: string
}

export interface ITime {
  h: number,
  m: number,
  duration: number
}