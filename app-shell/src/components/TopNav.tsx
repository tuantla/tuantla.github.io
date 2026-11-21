import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/apps', label: 'Apps' },
]

export function TopNav() {
  return (
    <nav className="flex items-center gap-1 px-3 h-10 bg-gray-100 border-b border-gray-300 flex-shrink-0">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded ${
              isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
