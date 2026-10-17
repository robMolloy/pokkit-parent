import { Nav, NavLink } from '@/components/Nav'
import { MarkdownContent } from '@/components/MarkdownContent'
import body from './index.md?raw'

const docLinks = [
  {
    to: '/docs/pages-philosophy',
    label: 'Pages philosophy',
    description: 'How page files map to content components',
  },
] as const

export default function DocsContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
      <Nav aria-label="Docs">
        {docLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            label={link.label}
            description={link.description}
          />
        ))}
      </Nav>
    </section>
  )
}
