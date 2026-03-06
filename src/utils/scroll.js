export const scrollToId = (id, options = {}) => {
  if (typeof window === 'undefined') {
    return false
  }

  const element = document.getElementById(id)

  if (!element) {
    return false
  }

  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset: options.offset ?? -96,
      duration: options.duration ?? 1.1,
    })
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return true
}
