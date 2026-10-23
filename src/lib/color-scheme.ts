export type ColorSchemePreference = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'pokkit-dev-color-scheme'

export function readColorSchemePreference(): ColorSchemePreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

export function writeColorSchemePreference(preference: ColorSchemePreference) {
  localStorage.setItem(STORAGE_KEY, preference)
  applyColorScheme(preference)
}

export function applyColorScheme(
  preference: ColorSchemePreference = readColorSchemePreference(),
) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark =
    preference === 'dark'
      ? true
      : preference === 'light'
        ? false
        : systemDark
  document.documentElement.classList.toggle('dark', dark)
}
