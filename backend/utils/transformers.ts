import { ICategory, ICategorySchema, IService, IServiceDb } from '../types/services'
import { IClientStaff, IStaff, IStaffDb } from '../types/staff'
import { IUserData } from '../types/user'

export const userTransformer = (user: any): IUserData => {
  return {
    id: user._id || user.id,
    username: user.username,
    role: user.role
  }
}

export const staffTransformer = (users: any[]): IStaff[] => {
  const data: IStaff[] = []
  users.forEach(user => {
    const obj = {
      id: user._id.toString(),
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      gender: user.gender,
      workdays: user.workdays,
      avatar: user.avatar
    }
    data.push(obj)
  })
  return data
}

export const clientStaffTransformer = (users: IStaffDb[]): IClientStaff[] => {
  const data: IClientStaff[] = []
  users.forEach(user => {
    const obj: IClientStaff = {
      id: user._id.toString(),
      name: user.name,
      gender: user.gender,
      avatar: user.avatar,
      workdays: user.workdays
    }
    data.push(obj)
  })
  return data
}

export const staffBodyTransformer = (body: any) => {
  if (body?.workdays && typeof body.workdays === 'string') {
    const arr = body.workdays.split(',')
    body.workdays = arr.map((value: string) => parseInt(value))
  }
  if (body?.isActive && typeof body.isActive === 'string') {
    body.isActive = Boolean(body.isActive)
  }
  return body
}

export const servicesTransformer = (categoriesDb: ICategorySchema[], servicesDb: IServiceDb[]) => {
  const services: IService[] = []
  servicesDb.forEach(item => {
    const obj: IService = {
      id: item._id.toString(),
      title: item.title,
      price: item.price,
      category: item.category,
      duration: item.duration
    }
    services.push(obj)
  })

  const categories: ICategory[] = []
  categoriesDb.forEach(item => {
    const obj = {
      id: item._id.toString(),
      title: item.title,
      services: services.filter(service => service.category == item._id.toString())
    }
    categories.push(obj)
  })

  return categories
}