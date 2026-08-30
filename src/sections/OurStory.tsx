import type { InvitationContent } from '../content/invitation.vi'
import { figmaAssets } from '../figma/assets'
import { publicUrl } from '../publicUrl'
import { Section } from './_shared'

function StoryCard({ text }: { text: string }) {
  return (
    <div className="flex h-full w-full flex-col items-start rounded-[20px] bg-[#f0efef] px-4 py-8 md:px-[12px] md:py-[43px]">
      <div className="flex w-full flex-1 items-start py-2 pl-1 md:pl-[10px] md:py-[10px]">
        <p className="w-full text-center font-sans text-[22px] font-medium leading-[1.5] text-[#666] md:text-[20px] md:leading-[1.2]">
          {text.trim() ? text : '\u00A0'}
        </p>
      </div>
    </div>
  )
}

export default function OurStory({ content }: { content: InvitationContent }) {
  const leftImg = content.gallery.images[6]?.src ?? publicUrl('/gallery/07.webp')
  const rightImg = content.gallery.images[7]?.src ?? publicUrl('/gallery/08.webp')

  return (
    <Section id="story">
      <div className="w-full min-w-0">
        <div className="flex items-center justify-center p-2 md:p-[10px]">
          <div className="w-full text-center font-sans text-[34px] font-bold leading-[1.2] text-(--invite-accent-strong) md:text-[39px]">
            Chuyện của chúng mình
          </div>
        </div>

        <div className="mt-6 flex h-auto w-full min-w-0 flex-col gap-6 md:mt-8 md:h-[761px] md:flex-row md:items-stretch md:gap-5 lg:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-4 self-stretch md:gap-[20px]">
            <div className="relative h-[260px] overflow-hidden rounded-[20px] md:h-auto md:flex-1 md:min-h-0">
              <img
                alt=""
                src={figmaAssets.imgMan1}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                alt=""
                src={leftImg}
                className="absolute inset-0 h-full w-full object-cover opacity-0"
              />
            </div>
            <div className="min-h-[160px] w-full md:h-[261px] md:min-h-0">
              <StoryCard text={content.story.leftText} />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 self-stretch md:items-end md:gap-[20px]">
            <div className="min-h-[160px] w-full md:h-[250px] md:min-h-0">
              <StoryCard text={content.story.rightText} />
            </div>
            <div className="relative h-[260px] overflow-hidden rounded-[20px] md:h-auto md:flex-1 md:min-h-0">
              <img
                alt=""
                src={figmaAssets.imgVolodymyrBy4Ho4Jpd8GUnsplash1}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                alt=""
                src={rightImg}
                className="absolute inset-0 h-full w-full object-cover opacity-0"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

