import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/designs', label: 'Designs' },
  { to: '/docs', label: 'Docs' },
  { to: '/hello/vite', label: 'Hello' },
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Pages">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/' || link.to === '/designs' || link.to === '/docs'}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
