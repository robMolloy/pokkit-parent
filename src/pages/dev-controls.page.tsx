import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { addSession } from '@/sessionsDb'

function toDatetimeLocalValue(date: Date) {
  const pad = (part: number) => String(part).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function DevControlsPage() {
  const [durationSeconds, setDurationSeconds] = useState('180')
  const [timeFinishedLocal, setTimeFinishedLocal] = useState(() =>
    toDatetimeLocalValue(new Date()),
  )
  const [status, setStatus] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function onAddMockSession() {
    const duration = Number(durationSeconds)
    const timefinished = new Date(timeFinishedLocal).getTime()

    if (!Number.isFinite(duration) || duration <= 0) {
      setStatus('Enter a duration greater than zero (seconds).')
      return
    }

    if (Number.isNaN(timefinished)) {
      setStatus('Enter a valid date and time finished.')
      return
    }

    setIsSaving(true)
    setStatus(null)

    try {
      await addSession({ duration, timefinished })
      setStatus('Mock squeeze session saved to IndexedDB.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save session.'
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
        <label className="flex flex-col gap-1">
          Duration (seconds)
          <input
            type="number"
            min={1}
            step={1}
            value={durationSeconds}
            onChange={(event) => setDurationSeconds(event.target.value)}
            className="rounded-md border border-input bg-background px-2 py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1">
          Date and time finished
          <input
            type="datetime-local"
            value={timeFinishedLocal}
            onChange={(event) => setTimeFinishedLocal(event.target.value)}
            className="rounded-md border border-input bg-background px-2 py-1.5"
          />
        </label>
        <Button type="button" disabled={isSaving} onClick={onAddMockSession}>
          {isSaving ? 'Saving…' : 'Add mock session'}
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
