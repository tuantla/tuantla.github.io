import { useState } from 'react'
import { Calendar } from './components/Calendar'
import { Toolbar } from './components/Toolbar'

export default function App() {
  const [today, setToday] = useState(() => new Date())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())

  const goToday = () => {
    const now = new Date()
    setToday(now)
    setMonth(now.getMonth() + 1)
    setYear(now.getFullYear())
  }

  return (
    <div className="flex flex-col h-dvh bg-white text-gray-900 overflow-hidden">
      <Toolbar
        month={month}
        year={year}
        onChange={(m, y) => {
          setMonth(m)
          setYear(y)
        }}
        onToday={goToday}
      />
      <Calendar month={month} year={year} today={today} />
    </div>
  )
}
