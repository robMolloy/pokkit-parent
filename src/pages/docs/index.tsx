import { NavLink } from 'react-router'

export default function DocsPage() {
  return (
    <section id="center">
      <div>
        <h1>Docs</h1>
        <p>
          Routes come from files in <code>src/pages</code>. This file is{' '}
          <code>docs/index.tsx</code>, so it is served at <code>/docs</code>.
        </p>
      </div>
      <nav className="docs-nav" aria-label="Docs">
        <NavLink to="/docs/pages-philosophy">Pages philosophy</NavLink>
      </nav>
    </section>
  )
}
