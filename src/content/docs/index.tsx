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
            to="/docs/todo-list"
            label="To-do list"
            description="Open tasks for the site, starting with simplifying styles"
          />
          <NavLink
            to="/docs/pages-philosophy"
            label="Pages philosophy"
            description="How page files map to content components"
          />
          <NavLink
            to="/docs/code-implementation"
            label="Code implementation"
            description="Prefer readable code over unnecessary abstraction"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
