import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './starter.css'
import './firebase'
import App from './App.tsx'
import { loadMopData } from './loadMopData.ts'

async function bootstrap() {
  await loadMopData()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
