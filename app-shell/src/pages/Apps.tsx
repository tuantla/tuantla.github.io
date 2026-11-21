import { NavLink } from 'react-router-dom'

export function Apps() {
  return (
    <div className="p-4 grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
      <NavLink
        to="/apps/base64"
        className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-300 rounded hover:border-blue-400 text-sm font-semibold"
      >
        Base64
      </NavLink>
    </div>
  )
}
