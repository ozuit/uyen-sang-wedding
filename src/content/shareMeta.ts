export type ShareRoutePath = '/' | '/nha-trai' | '/nha-gai'

export type ShareMeta = {
  title: string
  description: string
  /** Root-relative path under `public/`, e.g. `/gallery/20.webp`. */
  imagePath: string
  siteName: string
}

const defaultShareMeta: ShareMeta = {
  title: 'Thiệp mời cưới Uyên & Sang',
  description: 'Ngày vui sẽ trọn vẹn hơn khi có sự hiện diện của bạn.',
  imagePath: '/gallery/20.webp',
  siteName: 'uyen-sang-wedding.online',
}

export const shareMeta = defaultShareMeta

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

function normalizeBasePath(basePath: string): string {
  return basePath === '/' || basePath === '' ? '' : basePath.replace(/\/$/, '')
}

export function buildPageUrl(
  siteUrl: string,
  basePath: string,
  routePath: ShareRoutePath = '/',
): string {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const normalizedBase = normalizeBasePath(basePath)
  if (routePath === '/') {
    return `${normalizedSiteUrl}${normalizedBase}/`
  }
  return `${normalizedSiteUrl}${normalizedBase}${routePath}`
}

export function buildShareMetaTags(
  siteUrl: string,
  basePath: string,
  routePath: ShareRoutePath = '/',
): string {
  const pageUrl = buildPageUrl(siteUrl, basePath, routePath)
  const normalizedBase = normalizeBasePath(basePath)
  const imageUrl = `${siteUrl.replace(/\/$/, '')}${normalizedBase}${defaultShareMeta.imagePath}`
  const imageType = imageMimeType(defaultShareMeta.imagePath)

  const title = escapeHtml(defaultShareMeta.title)
  const description = escapeHtml(defaultShareMeta.description)
  const siteName = escapeHtml(defaultShareMeta.siteName)

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

export function patchShareMetaPageUrl(
  html: string,
  siteUrl: string,
  basePath: string,
  routePath: ShareRoutePath,
): string {
  const pageUrl = buildPageUrl(siteUrl, basePath, routePath)
  return html
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${pageUrl}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${pageUrl}" />`,
    )
}

export function shareRoutePathFromSide(
  side: 'both' | 'nha-trai' | 'nha-gai',
): ShareRoutePath {
  if (side === 'nha-trai') return '/nha-trai'
  if (side === 'nha-gai') return '/nha-gai'
  return '/'
}
