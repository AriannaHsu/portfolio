import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Work', end: true },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Nav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: 'rgba(244, 241, 236, 0.86)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1126px',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '22px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <NavLink
          to="/"
          style={{
            fontFamily: 'var(--font-system)',
            fontSize: '14px',
            letterSpacing: '0.04em',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          AH.
        </NavLink>

        <div style={{ display: 'flex', gap: '28px' }}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="nav-link"
              style={({ isActive }) => ({
                fontFamily: 'var(--font-system)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
