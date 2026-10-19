import { Nav, NavLink, VerticalNavList } from '@/components/Nav'

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
      <Nav aria-label="Designs">
        <VerticalNavList>
          <NavLink
            to="/docs/todo-list"
            label="Simplify styles"
            description="Consolidate CSS across designs and shared components (see docs to-do list)"
          />
          <NavLink
            to="/designs/circle-expand-contract"
            label="Circle expand and contract"
            description="The circle expands to the width of the screen, then contracts to a dot"
          />
          <NavLink
            to="/designs/circle-up-down"
            label="Circle up and down"
            description="A circle slowly rises, then falls—Tailwind layout with CSS keyframe motion"
          />
          <NavLink
            to="/designs/item-up-down"
            label="Item up and down"
            description="Pass any JSX as children—it rises and falls with the same motion as the circle demo"
          />
          <NavLink
            to="/designs/item-expand-contract"
            label="Item expand and contract"
            description="Pass any JSX as children—it grows to fill its container, then shrinks, like the circle expand demo"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
