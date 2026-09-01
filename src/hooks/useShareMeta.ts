import { useEffect } from 'react'
import {
  buildPageUrl,
  shareMeta,
  shareRoutePathFromSide,
} from '../content/shareMeta'
import type { InvitationSide } from '../lib/invitationSide'

const defaultSiteUrl = 'https://uyen-sang-wedding.online'

function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
) {
  let element = document.head.querySelector(selector)
  if (!element) {
    const tagName = selector.startsWith('meta')
      ? 'meta'
      : selector.startsWith('link')
        ? 'link'
        : 'meta'
    element = document.createElement(tagName)
    document.head.appendChild(element)
  }
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
}

export function useShareMeta(side: InvitationSide) {
  useEffect(() => {
    const routePath = shareRoutePathFromSide(side)
    const siteUrl = defaultSiteUrl
    const pageUrl = buildPageUrl(siteUrl, '/', routePath)
    const imageUrl = `${siteUrl}${shareMeta.imagePath}`

    document.title = shareMeta.title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: shareMeta.description,
    })
    upsertMeta('link[rel="canonical"]', {
      rel: 'canonical',
      href: pageUrl,
    })
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: shareMeta.title,
    })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: shareMeta.description,
    })
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: pageUrl,
    })
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: shareMeta.title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: shareMeta.description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    })
  }, [side])
}
