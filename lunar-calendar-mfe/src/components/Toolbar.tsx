import { getYearCanChi, MAX_YEAR, MIN_YEAR } from '../lib/lunar'

interface Props {
  month: number
  year: number
  onChange: (month: number, year: number) => void
  onToday: () => void
}

const BTN =
  'min-h-11 min-w-11 px-3 text-sm rounded border font-medium transition-colors border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40'
// 16px font avoids iOS Safari zooming in when a select is focused
const SELECT = 'min-h-11 px-2 text-base rounded border border-gray-300 bg-white text-gray-700'

export function Toolbar({ month, year, onChange, onToday }: Props) {
  const go = (delta: number) => {
    const idx = year * 12 + (month - 1) + delta
    onChange((idx % 12) + 1, Math.floor(idx / 12))
  }
  const atMin = year === MIN_YEAR && month === 1
  const atMax = year === MAX_YEAR && month === 12

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <a
          href={`${import.meta.env.VITE_APP_SHELL_URL}/`}
          title="Home"
          aria-label="Home"
          className="flex items-center justify-center min-h-11 min-w-11 rounded text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h5v-6h4v6h5V10" />
          </svg>
        </a>
        <span className="font-semibold text-gray-700 text-sm mr-1">Lịch Âm</span>
        <div className="h-4 w-px bg-gray-300 hidden sm:block" />
        <div className="flex items-center justify-center gap-2">
          <button className={BTN} onClick={() => go(-1)} disabled={atMin} aria-label="Tháng trước">‹</button>
          <select
            className={SELECT}
            value={month}
            onChange={e => onChange(Number(e.target.value), year)}
            aria-label="Tháng"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>Tháng {i + 1}</option>
            ))}
          </select>
          <button className={BTN} onClick={() => go(1)} disabled={atMax} aria-label="Tháng sau">›</button>
          <select
            className={SELECT}
            value={year}
            onChange={e => onChange(month, Number(e.target.value))}
            aria-label="Năm"
          >
            {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => (
              <option key={i} value={MIN_YEAR + i}>{MIN_YEAR + i}</option>
            ))}
          </select>
        </div>
        <button className={BTN} onClick={onToday}>Hôm nay</button>
      </div>
      <div className="mt-1 text-xs text-gray-500 text-center">
        Năm {getYearCanChi(year)}
      </div>
    </div>
  )
}
