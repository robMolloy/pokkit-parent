import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section id="center">
      <div>
        <h1>Page not found</h1>
        <p>No file in <code>src/pages</code> matches this URL.</p>
        <p>
          <Link className="page-link" to="/">
            Go home
          </Link>
        </p>
      </div>
    </section>
  )
}
