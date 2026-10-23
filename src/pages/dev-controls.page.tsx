import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { addSessions } from '@/sessionsDb'
import type { Sessions } from '@/types/sessions'

const MS_IN_24_HOURS = 24 * 60 * 60 * 1000
const MIN_EXERCISE_TIME_SECONDS = 60
const MAX_EXERCISE_TIME_SECONDS = 600

function randomMockSessions(count: number): Sessions[] {
  const now = Date.now()
  const durationSpan =
    MAX_EXERCISE_TIME_SECONDS - MIN_EXERCISE_TIME_SECONDS + 1

  return Array.from({ length: count }, () => ({
    duration:
      MIN_EXERCISE_TIME_SECONDS + Math.floor(Math.random() * durationSpan),
    timefinished: now - Math.floor(Math.random() * MS_IN_24_HOURS),
  }))
}

export default function DevControlsPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function onAddRandomMockSessions() {
    setIsSaving(true)
    setStatus(null)

    try {
      await addSessions(randomMockSessions(5))
      setStatus('Added 5 random squeeze sessions to IndexedDB.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save sessions.'
      setStatus(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section id="center">
      <div>
        <h1>Dev controls</h1>
        <p>Development-only toggles and debug settings.</p>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-background px-4 py-3 text-sm shadow-sm">
        <h2 className="text-sm font-medium text-foreground">
          Squeeze exercises (IndexedDB)
        </h2>
        <p className="text-muted-foreground">
          Adds five sessions with random duration (
          {MIN_EXERCISE_TIME_SECONDS}–{MAX_EXERCISE_TIME_SECONDS}s) and a
          finished time within the last 24 hours.
        </p>
        <Button
          type="button"
          disabled={isSaving}
          onClick={onAddRandomMockSessions}
        >
          {isSaving ? 'Saving…' : 'Add 5 random mock sessions'}
        </Button>
        {status ? (
          <p className="text-muted-foreground" role="status">
            {status}
          </p>
        ) : null}
      </div>
    </section>
  )
}
