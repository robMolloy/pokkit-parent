import { MarkdownContent } from '@/components/MarkdownContent'
import body from './pages-philosophy.md?raw'

export default function PagesPhilosophyContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
    </section>
  )
}
