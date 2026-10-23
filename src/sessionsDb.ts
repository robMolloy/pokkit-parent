import type { Sessions } from '@/types/sessions'

export const SESSIONS_DB_NAME = 'pokkit-parent'
export const SESSIONS_DB_VERSION = 1
export const SESSIONS_STORE_NAME = 'sessions'

export function openSessionsDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SESSIONS_DB_NAME, SESSIONS_DB_VERSION)

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to open IndexedDB'))
    }

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(SESSIONS_STORE_NAME)) {
        db.createObjectStore(SESSIONS_STORE_NAME, { autoIncrement: true })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

export async function addSession(session: Sessions): Promise<void> {
  const db = await openSessionsDatabase()

  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(SESSIONS_STORE_NAME, 'readwrite')
      tx.objectStore(SESSIONS_STORE_NAME).add(session)

      tx.oncomplete = () => resolve()
      tx.onerror = () => {
        reject(tx.error ?? new Error('Failed to write session'))
      }
    })
  } finally {
    db.close()
  }
}
