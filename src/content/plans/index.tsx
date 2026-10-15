import { MarkdownContent } from '@/components/MarkdownContent'
import body from './index.md?raw'

export default function PlansContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
    </section>
  )
}
