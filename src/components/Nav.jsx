import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <NavLink to="/" className="font-medium text-sm tracking-wide">
        Your Name
      </NavLink>
      <div className="flex gap-6 text-sm">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'underline underline-offset-4' : ''}>
          Work
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'underline underline-offset-4' : ''}>
          About
        </NavLink>
      </div>
    </nav>
  )
}
