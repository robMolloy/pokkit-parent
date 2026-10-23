import { useState } from 'react'
import { Nav, NavLink, VerticalNavList } from '@/components/Nav'
import { app } from '@/firebase'
import {
  readColorSchemePreference,
  type ColorSchemePreference,
  writeColorSchemePreference,
} from '@/lib/color-scheme'

const schemeOptions: { value: ColorSchemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export default function DevControlsPage() {
  const [colorScheme, setColorScheme] = useState(readColorSchemePreference)

  function onColorSchemeChange(preference: ColorSchemePreference) {
    setColorScheme(preference)
    writeColorSchemePreference(preference)
  }

  return (
    <section id="center">
      <div>
        <h1>Dev controls</h1>
        <p>
          Local developer settings and shortcuts. Reach this page from the home
          screen—not from the site nav.
        </p>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-background px-4 py-3 text-sm shadow-sm">
        <fieldset className="flex flex-col gap-2 border-0 p-0">
          <legend className="text-sm font-medium text-foreground">
            Color scheme
          </legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {schemeOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  name="color-scheme"
                  checked={colorScheme === option.value}
                  onChange={() => onColorSchemeChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="text-muted-foreground">Build mode</dt>
          <dd className="tabular-nums text-foreground">
            {import.meta.env.MODE}
          </dd>
          <dt className="text-muted-foreground">Firebase project</dt>
          <dd className="text-foreground">{app.options.projectId}</dd>
        </dl>
      </div>
      <Nav aria-label="Developer pages">
        <VerticalNavList>
          <NavLink
            to="/designs"
            label="Designs"
            description="Motion demos with in-page tuning controls"
          />
          <NavLink
            to="/docs"
            label="Docs"
            description="Implementation notes and project philosophy"
          />
          <NavLink
            to="/plans"
            label="Plans"
            description="Planning notes and upcoming work"
          />
        </VerticalNavList>
      </Nav>
    </section>
  )
}
