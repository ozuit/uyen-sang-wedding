export type InvitationSide = 'both' | 'nha-trai' | 'nha-gai'

export type GuestSideLabel = 'Nhà trai' | 'Nhà gái'

export function invitationSideFromPath(pathname: string): InvitationSide {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  if (normalized === '/nha-trai') return 'nha-trai'
  if (normalized === '/nha-gai') return 'nha-gai'
  return 'both'
}

export function guestSideLabel(side: InvitationSide): GuestSideLabel | null {
  if (side === 'nha-trai') return 'Nhà trai'
  if (side === 'nha-gai') return 'Nhà gái'
  return null
}
