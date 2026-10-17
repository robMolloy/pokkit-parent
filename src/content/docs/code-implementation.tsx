import { MarkdownContent } from '@/components/MarkdownContent'
import body from './code-implementation.md?raw'

export default function CodeImplementationContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
    </section>
  )
}
