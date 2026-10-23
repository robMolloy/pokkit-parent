import { loadMockData } from './loadMockData.ts'

export async function startupRoutine(): Promise<void> {
  await loadMockData()
}
