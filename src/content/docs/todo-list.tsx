import { MarkdownContent } from '@/components/MarkdownContent'
import body from './todo-list.md?raw'

export default function TodoListContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
    </section>
  )
}
