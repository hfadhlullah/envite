import { useEffect, useState } from 'react'

function calculateTimeLeft(targetDate) {
  const distance = new Date(targetDate).getTime() - Date.now()

  if (distance <= 0 || Number.isNaN(distance)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isComplete: false,
  }
}

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate))

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}
