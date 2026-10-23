import type { Sessions } from './types/sessions.ts'
import { openSessionsDatabase, SESSIONS_STORE_NAME } from './sessionsDb.ts'

function readAllSessions(db: IDBDatabase): Promise<Sessions[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SESSIONS_STORE_NAME, 'readonly')
    const request = tx.objectStore(SESSIONS_STORE_NAME).getAll()

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to read sessions from IndexedDB'))
    }

    request.onsuccess = () => {
      resolve(request.result as Sessions[])
    }
  })
}

export async function getData(): Promise<Sessions[]> {
  const db = await openSessionsDatabase()

  try {
    return await readAllSessions(db)
  } finally {
    db.close()
  }
}
