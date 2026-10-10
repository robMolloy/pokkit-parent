import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/hello/vite', label: 'Hello' },
  { to: '/designs/breathe-in-breathe-out', label: 'Breathe' },
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Pages">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/'}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
