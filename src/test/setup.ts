import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {
    this.callback([], this as unknown as ResizeObserver)
  }

  unobserve() {}

  disconnect() {}
}

globalThis.ResizeObserver =
  ResizeObserverMock as unknown as typeof ResizeObserver
