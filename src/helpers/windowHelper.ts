export function isMobileScreen() {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768
  }
  return false
}
