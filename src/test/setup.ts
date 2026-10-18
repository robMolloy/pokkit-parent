import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class ResizeObserverMock {
  constructor(private callback: ResizeObserverCallback) {}

  observe(target: Element) {
    this.callback([{ target } as ResizeObserverEntry], this)
  }

  disconnect() {}

  unobserve() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
