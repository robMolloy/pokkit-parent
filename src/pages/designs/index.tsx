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
            to="/designs/circle-expand-contract"
            label="Circle expand and contract"
            description="The circle expands to the width of the screen, then contracts to a dot"
          />
          <NavLink
            to="/designs/final-circle-expand-contract"
            label="Final circle expand and contract"
            description="Expand and contract with CSS keyframes and Tailwind—CircleUpDown-style simplicity"
          />
          <NavLink
            to="/designs/circle-expand-contract-tailwind"
            label="Circle expand and contract (Tailwind)"
            description="Same expand-and-contract motion built with Tailwind utilities"
          />
          <NavLink
            to="/designs/simple-circle-expand-contract"
            label="Simple circle expand and contract"
            description="Expand and contract with transitions and a duration prop—no keyframes"
          />
          <NavLink
            to="/designs/circle-up-down"
            label="Circle up and down"
            description="A circle slowly rises, then falls—Tailwind layout with CSS keyframe motion"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
