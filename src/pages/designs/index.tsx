import { NavLink } from 'react-router'

const designLinks = [
  {
    to: '/designs/breathe-in-breathe-out',
    label: 'Breathe in, breathe out',
  },
  {
    to: '/designs/breathe-in-breathe-out-tailwind',
    label: 'Breathe in, breathe out (Tailwind)',
  },
]

export default function DesignsPage() {
  return (
    <section id="center">
      <div>
        <h1>Designs</h1>
        <p>
          Routes come from files in <code>src/pages</code>. This file is{' '}
          <code>designs/index.tsx</code>, so it is served at <code>/designs</code>.
        </p>
      </div>
      <nav className="designs-nav" aria-label="Designs">
        {designLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </section>
  )
}
