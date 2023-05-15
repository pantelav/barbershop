export interface IService {
  id: string,
  title: string,
  price: number,
  category: string,
  duration: number
}

export interface ICategoryWithServices {
  id: string,
  title: string,
  services: IService[]
}