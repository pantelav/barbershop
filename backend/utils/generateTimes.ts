import Order from '../models/Order'
import { ITime } from '../types/order'

const START = 10
const END = 21
const INTERVAL = 15

function padZero (number: number) {
  return number.toString().padStart(2, '0')
}

export const generateTimes = async (barberId: string, date: string) => {
  const exludedTimes = await getExcludedTimes(barberId, date)
  const currentTime = new Date();
  const startDate = new Date(date);
  startDate.setHours(START, 0, 0, 0); // Устанавливаем начальное время - 10:00
  const endDate = new Date(date);
  endDate.setHours(END, INTERVAL, 0, 0); // Устанавливаем конечное время - 21:00

  if (startDate.getTime() <= currentTime.getTime() && currentTime.getTime() < endDate.getTime()) {
    startDate.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
  }
  if (currentTime.getTime() >= endDate.getTime()) return []

  const times = [];
  const interval = 15; // Интервал в минутах

  while (startDate.getTime() < endDate.getTime()) {
    const formattedTime = `${padZero(startDate.getHours())}:${padZero(startDate.getMinutes())}`;
    // Проверяем, исключено ли текущее время
    if (!isTimeExcluded(startDate, exludedTimes)) {
      times.push(formattedTime);
    }
    startDate.setMinutes(startDate.getMinutes() + interval);
  }

  return times;
}

function isTimeExcluded (date: Date, exclude: ITime[]) {
  for (const item of exclude) {
    const startHour = item.h;
    const startMinute = item.m;
    const duration = item.duration;

    const startTime = new Date(date);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + duration);

    if (date >= startTime && date < endTime) {
      return true;
    }
  }

  return false;
}

async function getExcludedTimes (barberId: string, date: string) {
  if (date.split('.').length === 3) {
    // @ts-ignore
    const dateArr = date.split('.')
    // @ts-ignore
    date = new Date(dateArr[2], +dateArr[1] - 1, dateArr[0])
    date = date?.toString()
  }
  // @ts-ignore
  const monthName = date.split(' ')[1]
  const newDate = new Date(date as string)
  let d: string | number = newDate.getDate()
  if (d < 10) d = '0' + d.toString()
  const y = newDate.getFullYear()
  const query = `${monthName} ${d} ${y}`
  const orders = await Order.find({ barber: barberId, date: { $regex: query } })
  const busyTime: ITime[] = []
  orders.forEach(order => {
    const orderDate = new Date(order.date)
    const h = orderDate.getHours()
    const m = orderDate.getMinutes()
    let duration = 0
    order.services.forEach(service => {
      duration += service.duration
    })
    busyTime.push({ h, m, duration })
  })
  return busyTime
}