import type { Sessions } from './types/sessions.ts'

const DB_NAME = 'pokkit-parent'
const DB_VERSION = 1
const STORE_NAME = 'sessions'

const MOCK_SESSIONS: Sessions[] = [
  {
    duration: 180,
    timefinished: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    duration: 300,
    timefinished: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    duration: 120,
    timefinished: Date.now() - 3 * 60 * 60 * 1000,
  },
]

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to open IndexedDB'))
    }

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

function countSessions(db: IDBDatabase): Promise<number> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const request = tx.objectStore(STORE_NAME).count()

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to count sessions'))
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

function addSessions(db: IDBDatabase, sessions: Sessions[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    for (const session of sessions) {
      store.add(session)
    }

    tx.oncomplete = () => resolve()
    tx.onerror = () => {
      reject(tx.error ?? new Error('Failed to write sessions'))
    }
  })
}

/** Seeds IndexedDB with mock session records when the store is empty. */
export async function loadMopData(): Promise<void> {
  const db = await openDatabase()

  try {
    const existingCount = await countSessions(db)
    if (existingCount === 0) {
      await addSessions(db, MOCK_SESSIONS)
    }
  } finally {
    db.close()
  }
}
