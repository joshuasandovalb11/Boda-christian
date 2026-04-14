import { useState, useEffect } from 'react'

const WEDDING = new Date('2026-05-23T17:00:00')

function getTimeLeft() {
  const diff = WEDDING.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const blocks = [
    { value: time.days,    label: 'Días' },
    { value: time.hours,   label: 'Horas' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Seg' },
  ]

  return (
    <div className="flex items-start justify-center gap-1.5 sm:gap-3 md:gap-6">
      {blocks.map(({ value, label }, idx) => (
        <div key={label} className="flex items-start gap-1.5 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className="relative w-15.5 h-15.5 sm:w-20 sm:h-20 md:w-24 md:h-24
                            bg-carbon border border-dorado/25 flex items-center justify-center">
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-dorado" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-dorado" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-dorado" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-dorado" />
              <span className="font-serif text-dorado text-xl sm:text-2xl md:text-3xl font-light">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            <span className="font-elegant text-[9px] sm:text-[11px] md:text-xs
                             text-lino/60 tracking-[0.15em] uppercase mt-1.5">
              {label}
            </span>
          </div>
          {idx < 3 && (
            <span className="font-serif text-dorado/80 text-lg sm:text-xl mt-3 sm:mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}