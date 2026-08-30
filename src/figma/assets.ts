import manifest from '../../public/figma/manifest.json'
import { publicUrl } from '../publicUrl'

const raw = manifest as Record<string, string>

export const figmaAssets = Object.fromEntries(
  Object.entries(raw).map(([k, path]) => [k, publicUrl(path)]),
) as typeof raw

