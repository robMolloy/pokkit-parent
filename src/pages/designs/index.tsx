import { NavLink } from 'react-router'

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
        <NavLink to="/designs/circle-expand-contract">
          Circle expand and contract
        </NavLink>
        <NavLink to="/designs/circle-expand-contract-tailwind">
          Circle expand and contract (Tailwind)
        </NavLink>
        <NavLink to="/designs/circle-up-down">Circle up and down</NavLink>
      </nav>
    </section>
  )
}
