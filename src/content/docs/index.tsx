import { Nav, NavLink, VerticalNavList } from '@/components/Nav'
import { MarkdownContent } from '@/components/MarkdownContent'
import body from './index.md?raw'

export default function DocsContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
      <Nav aria-label="Docs">
        <VerticalNavList>
          <NavLink
            to="/docs/pages-philosophy"
            label="Pages philosophy"
            description="How page files map to content components"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
