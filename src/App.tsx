import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'
import routes from '~react-pages'
import { SiteNav } from './components/SiteNav.tsx'

function AppRoutes() {
  return <Suspense fallback={null}>{useRoutes(routes)}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteNav />
      <AppRoutes />
    </BrowserRouter>
  )
}
