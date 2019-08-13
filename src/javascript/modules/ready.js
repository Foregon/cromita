const ready = fn => {
  if (typeof fn !== 'function') return

  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    // eslint-disable-next-line consistent-return
    return fn()
  }

  document.addEventListener('DOMContentLoaded', fn, false)
}

export default ready
