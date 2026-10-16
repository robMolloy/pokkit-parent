import type { ComponentProps } from 'react'
import type { Components, ExtraProps } from 'react-markdown'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import './MarkdownContent.css'

type MarkdownLinkProps = ComponentProps<'a'> & ExtraProps

function MarkdownLink({ node, href, children, ...props }: MarkdownLinkProps) {
  void node

  if (href?.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }

  const external = href?.startsWith('http://') || href?.startsWith('https://')

  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

const components = {
  a: MarkdownLink,
} satisfies Components

type MarkdownContentProps = {
  children: string
  className?: string
}

export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown', className)}>
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </Markdown>
    </div>
  )
}
