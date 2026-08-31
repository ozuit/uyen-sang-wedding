export type ShareMeta = {
  title: string
  description: string
  /** Root-relative path under `public/`, e.g. `/gallery/20.png`. */
  imagePath: string
  siteName: string
}

export const shareMeta: ShareMeta = {
  title: 'Thiệp mời cưới Uyên & Sang',
  description:
    'Trân trọng kính mời bạn đến dự lễ cưới Lê Quang Sang & Tống Phương Uyên.',
  imagePath: '/gallery/20.webp',
  siteName: 'uyen-sang-wedding.online',
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function imageMimeType(path: string): string {
  if (path.endsWith('.webp')) return 'image/webp'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  return 'image/png'
}

export function buildShareMetaTags(siteUrl: string, basePath: string): string {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const normalizedBase =
    basePath === '/' || basePath === '' ? '' : basePath.replace(/\/$/, '')
  const pageUrl = `${normalizedSiteUrl}${normalizedBase}/`
  const imageUrl = `${normalizedSiteUrl}${normalizedBase}${shareMeta.imagePath}`
  const imageType = imageMimeType(shareMeta.imagePath)

  const title = escapeHtml(shareMeta.title)
  const description = escapeHtml(shareMeta.description)
  const siteName = escapeHtml(shareMeta.siteName)

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${pageUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="vi_VN" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`,
    `<meta property="og:image:type" content="${imageType}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].join('\n    ')
}
