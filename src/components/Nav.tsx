import { ChevronRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { NavLink as RouterNavLink } from 'react-router'
import { cn } from 'cn'

type NavProps = Omit<ComponentProps<'nav'>, 'className'>

export function Nav({ children, ...props }: NavProps) {
  return <nav {...props}>{children}</nav>
}

type NavListProps = Omit<ComponentProps<'div'>, 'className'>

export function VerticalNavList({ children, ...props }: NavListProps) {
  return (
    <div
      data-orientation="vertical"
      className="flex w-full max-w-md flex-col gap-2"
      {...props}
    >
      {children}
    </div>
  )
}

export function HorizontalNavList({ children, ...props }: NavListProps) {
  return (
    <div
      data-orientation="horizontal"
      className="flex w-full flex-row flex-wrap gap-2"
      {...props}
    >
      {children}
    </div>
  )
}

type NavLinkProps = Omit<ComponentProps<typeof RouterNavLink>, 'className' | 'children'> & {
  label: string
  description: string
}

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'group flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    isActive && 'border-primary bg-muted ring-2 ring-ring/30',
  )
}

export function NavLink({
  label,
  description,
  ...props
}: NavLinkProps) {
  return (
    <RouterNavLink className={navLinkClassName} {...props}>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-foreground/65">
          {description}
        </span>
      </span>
      <ChevronRight
        className="size-4 shrink-0 text-foreground/50 transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden
      />
    </RouterNavLink>
  )
}
