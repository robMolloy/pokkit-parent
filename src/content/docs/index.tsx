import { DocsNav, DocsNavLink } from '@/components/DocsNav'
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
      <DocsNav aria-label="Docs">
        {docLinks.map((link) => (
          <DocsNavLink
            key={link.to}
            to={link.to}
            label={link.label}
            description={link.description}
          />
        ))}
      </DocsNav>
    </section>
  )
}
