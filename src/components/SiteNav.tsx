import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/designs', label: 'Designs' },
  { to: '/hello/vite', label: 'Hello' },
  { to: '/designs/breathe-in-breathe-out', label: 'Breathe' },
  { to: '/designs/breathe-in-breathe-out-tailwind', label: 'Breathe TW' },
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
