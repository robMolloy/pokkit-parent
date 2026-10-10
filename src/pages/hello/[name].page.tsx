import { useParams } from 'react-router'

export default function HelloPage() {
  const { name } = useParams()

  return (
    <section id="center">
      <div>
        <h1>Hello {name}</h1>
        <p>
          <code>src/pages/hello/[name].page.tsx</code> maps to{' '}
          <code>/hello/:name</code>.
        </p>
      </div>
    </section>
  )
}
