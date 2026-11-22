import { dayOfWeek, getCanChi, getMonth, jdn, MAX_YEAR, MIN_YEAR } from '../lib/lunar'

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
/** The selected month plus the following months shown side by side */
const MONTHS_SHOWN = 3

function dowColor(dow: number) {
  if (dow === 0) return 'text-red-600'
  if (dow === 6) return 'text-green-600'
  return 'text-gray-900'
}

function MonthGrid({ month, year, today }: { month: number; year: number; today: Date }) {
  const days = getMonth(month, year)
  const lead = days.length ? dayOfWeek(days[0].jd) : 0
  const isCurrentMonth = today.getMonth() + 1 === month && today.getFullYear() === year

  return (
    <section className="shrink-0 snap-start w-[88%] sm:w-[46%] lg:w-[calc((100%-2rem)/3)]">
      <h2 className="text-sm font-semibold text-gray-700 text-center mb-1">
        Tháng {month} / {year}
      </h2>
      <div className="grid grid-cols-7 gap-px text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`py-1 ${i === 0 ? 'text-red-600' : i === 6 ? 'text-green-600' : ''}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded overflow-hidden">
        {Array.from({ length: lead }, (_, i) => (
          <div key={`e${i}`} className="bg-gray-50 aspect-square" />
        ))}
        {days.map((lunar, i) => {
          const solar = i + 1
          const dow = dayOfWeek(jdn(solar, month, year))
          const isToday = isCurrentMonth && today.getDate() === solar
          const isTet = lunar.day === 1 && lunar.month === 1
          const lunarText = solar === 1 || lunar.day === 1 ? `${lunar.day}/${lunar.month}` : `${lunar.day}`
          const [dayName, monthName, yearName] = getCanChi(lunar)
          return (
            <div
              key={solar}
              title={`Ngày ${dayName}, tháng ${monthName}, năm ${yearName}`}
              className={`aspect-square flex flex-col items-center justify-center gap-0.5 min-w-0
                ${isToday ? 'bg-blue-100 ring-2 ring-inset ring-blue-500' : isTet ? 'bg-yellow-100' : 'bg-white'}`}
            >
              <span className={`text-base font-semibold leading-none ${dowColor(dow)}`}>{solar}</span>
              <span
                className={`text-[10px] leading-none ${
                  lunar.leap ? 'text-purple-600' : lunar.day === 1 ? 'text-orange-600 font-semibold' : 'text-gray-500'
                }`}
              >
                {lunarText}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function Calendar({ month, year, today }: { month: number; year: number; today: Date }) {
  const months = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const idx = year * 12 + (month - 1) + i
    return { month: (idx % 12) + 1, year: Math.floor(idx / 12) }
  }).filter(m => m.year >= MIN_YEAR && m.year <= MAX_YEAR)

  return (
    <div className="flex-1 overflow-auto p-2 sm:p-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
      {/* key resets the horizontal scroll position when the base month changes */}
      <div key={`${year}-${month}`} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
        {months.map(m => (
          <MonthGrid key={`${m.year}-${m.month}`} month={m.month} year={m.year} today={today} />
        ))}
      </div>
    </div>
  )
}
