import Order from '../models/Order'
import { ITime } from '../types/order'

const START = 10
const END = 21
const INTERVAL = 15

function padZero (number: number) {
  return number.toString().padStart(2, '0')
}

function isTimeExcluded (time: string, excludeTimes: ITime[]) {
  for (let i = 0; i < excludeTimes.length; i++) {
    const excludedTime = excludeTimes[i]
    const excludedHour = excludedTime.h
    const excludedMinute = excludedTime.m
    const excludedDuration = excludedTime.duration;

    const startTime = excludedHour * 60 + excludedMinute;
    const endTime = startTime + excludedDuration;

    const currentTime = time.split(':');
    const currentHours = parseInt(currentTime[0], 10);
    const currentMinutes = parseInt(currentTime[1], 10);
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    if (currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime) {
      return true
    }
  }

  return false
}

export async function generateTimes (barberId: string, date: string) {
  // @ts-ignore
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

  const times = []
  let currentTime = START
  while (currentTime <= END) {
    const h = Math.floor(currentTime)
    const m = (currentTime % 1) * 60
    const formattedTime = `${padZero(h)}:${padZero(m)}`
    if (!isTimeExcluded(formattedTime, busyTime)) {
      times.push(formattedTime)
    }
    currentTime += INTERVAL / 60
  }
  return times
}