import { ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from 'cn'
import { MarkdownContent } from '@/components/MarkdownContent'
import body from './index.md?raw'

const docLinks = [
  {
    to: '/docs/pages-philosophy',
    label: 'Pages philosophy',
    description: 'How page files map to content components',
  },
] as const

const docLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    'group flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    isActive && 'border-primary bg-muted ring-2 ring-ring/30',
  )

export default function DocsContent() {
  return (
    <section id="center">
      <MarkdownContent>{body}</MarkdownContent>
      <nav
        className="flex w-full max-w-md flex-col gap-2"
        aria-label="Docs"
      >
        {docLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={docLinkClassName}
          >
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">
                {link.label}
              </span>
              <span className="mt-0.5 block text-xs text-foreground/65">
                {link.description}
              </span>
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-foreground/50 transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden
            />
          </NavLink>
        ))}
      </nav>
    </section>
  )
}
