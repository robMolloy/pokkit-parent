import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class ResizeObserverMock {
  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.callback([{ target } as ResizeObserverEntry], this)
  }

  disconnect() {}

  unobserve() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
