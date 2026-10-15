import { NavLink } from 'react-router'
import { MarkdownContent } from '@/components/MarkdownContent'
import body from './index.md?raw'

export default function DocsContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
      <nav className="docs-nav" aria-label="Docs">
        <NavLink to="/docs/pages-philosophy">Pages philosophy</NavLink>
      </nav>
    </section>
  )
}
