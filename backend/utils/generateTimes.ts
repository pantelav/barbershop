import { ITime } from '../types/order'

export function generateTimes (excludeTimes: ITime[], start = 10, end = 21, interval = 15) {
  const times = []
  let currentTime = start
  while (currentTime <= end) {
    const h = Math.floor(currentTime)
    const m = (currentTime % 1) * 60
    const formattedTime = `${padZero(h)}:${padZero(m)}`
    if (!isTimeExcluded(formattedTime, excludeTimes)) {
      times.push(formattedTime)
    }
    currentTime += interval / 60
  }
  return times
}

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