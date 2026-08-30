export function toGoogleMapsEmbedSrc(query: string) {
  const q = encodeURIComponent(query)
  return `https://www.google.com/maps?q=${q}&output=embed`
}

