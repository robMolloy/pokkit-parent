import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/designs', label: 'Designs' },
  { to: '/docs', label: 'Docs' },
  { to: '/plans', label: 'Plans' },
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Pages">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={
            link.to === '/' ||
            link.to === '/designs' ||
            link.to === '/docs' ||
            link.to === '/plans'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
