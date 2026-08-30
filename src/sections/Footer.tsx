import { Section } from './_shared'

export default function Footer() {
  return (
    <Section className="py-[60px]">
      <div className="px-4 text-center text-[17px] leading-relaxed text-(--invite-muted) md:px-0 md:text-xs md:leading-normal">
        <div className="font-medium text-(--invite-text)">
          Cảm ơn bạn đã đến chung vui cùng chúng tôi
        </div>
        <div className="mt-2">© {new Date().getFullYear()}</div>
      </div>
    </Section>
  )
}

