import { Nav, NavLink, VerticalNavList } from '@/components/Nav'

export default function HomePage() {
  return (
    <section id="center">
      <div>
        <h1>Welcome to Happy Parent</h1>
        <p>Simple tools for everyday parenting—less hassle, more ease.</p>
      </div>
      <Nav aria-label="Exercises">
        <VerticalNavList>
          <NavLink
            to="/exercises/pelvic-floor-exercises"
            label="Pelvic floor exercises"
            description="Pelvic-floor work to build strength and control"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
