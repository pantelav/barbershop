import { IService } from '~/types/service'
import { IBarber } from '~/types/staff'
interface IOrder {
  steps: number,
  barber: IBarber | null,
  services: IService[],
  date: Date | string | null,
  time: string | null,
  contacts: IContacts,
}

interface IContacts {
  name: string,
  phone: string,
  email: string,
  comment: string
}

export const useOrder = () => useState('order', () => {
  const order: IOrder = {
    steps: 1,
    barber: null,
    services: [],
    date: null,
    time: null,
    contacts: {
      name: '',
      phone: '',
      email: '',
      comment: ''
    },
  }
  return order
})

export const useClearState = () => {
  const order = useOrder()
  order.value.steps = 1
  order.value.barber = null
  order.value.services = []
  order.value.date = null
  order.value.time = null
  order.value.contacts.name = ''
  order.value.contacts.phone = ''
  order.value.contacts.email = ''
  order.value.contacts.comment = ''
}