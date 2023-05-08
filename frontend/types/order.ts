import { IService } from './service';
type Status = 'active' | 'resolved' | 'rejected'

export interface IOrder {
  name: string,
  phone: string,
  price: number,
  services: IService[],
  status: Status,
  barber: string | null,
  comment: string,
  date: Date | string | null,
  time?: string,
  _id?: string
}