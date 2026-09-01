import type { InvitationContent, InvitationEvent } from '../content/invitation.vi'
import type { InvitationSide } from './invitationSide'

export function primaryEventForSide(
  content: InvitationContent,
  side: InvitationSide,
): InvitationEvent | undefined {
  if (side === 'nha-gai') {
    return content.events.find((e) => e.key === 'party')
  }
  return content.events.find((e) => e.key === 'church')
}

export function showGroomEvent(side: InvitationSide): boolean {
  return side === 'both' || side === 'nha-trai'
}

export function showBrideEvent(side: InvitationSide): boolean {
  return side === 'both' || side === 'nha-gai'
}

export function groomNameFirst(side: InvitationSide): boolean {
  return side !== 'nha-gai'
}
