import type { InvitationContent } from '../content/invitation.vi'

export default function MapAndDirections({
  content,
}: {
  content: InvitationContent
}) {
  // In the Figma design, maps are presented as "Open Map" buttons
  // within the event cards. Keep this component as a no-op.
  void content
  return null
}

