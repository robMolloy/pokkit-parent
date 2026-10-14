import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/designs', label: 'Designs' },
  { to: '/designs/breathe-in-breathe-out', label: 'Breathe' },
  { to: '/designs/breathe-in-breathe-out-tailwind', label: 'Breathe TW' },
  { to: '/designs/squeeze-relax', label: 'Squeeze' },
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Pages">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/' || link.to === '/designs'}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
