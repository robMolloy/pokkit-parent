import { NavLink } from 'react-router'

const designLinks = [
  {
    to: '/designs/circle-expand-contract',
    label: 'Circle expand, contract',
  },
  {
    to: '/designs/circle-expand-contract-tailwind',
    label: 'Circle expand, contract (Tailwind)',
  },
  {
    to: '/designs/circle-up-down',
    label: 'Circle up, down',
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
