export function getQueryParam(name) {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

export function getGuestName() {
  const guest = getQueryParam('to')

  if (!guest) return 'Tamu Undangan'

  return decodeURIComponent(guest.replace(/\+/g, ' ')).trim() || 'Tamu Undangan'
}

export function getInitialThemeId(validThemeIds, fallbackThemeId) {
  const requestedStyle = getQueryParam('style')

  if (requestedStyle && validThemeIds.includes(requestedStyle)) {
    return requestedStyle
  }

  return fallbackThemeId
}
