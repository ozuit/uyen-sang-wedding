import { Section } from "./_shared";

export default function Footer() {
  return (
    <Section className="py-[60px]">
      <div className="px-4 text-center text-[17px] leading-relaxed text-(--invite-muted) md:px-0 md:text-xs md:leading-normal">
        <div className="font-medium text-(--invite-text)">
          Ngày vui sẽ trọn vẹn hơn khi có sự hiện diện của bạn.
        </div>
        <div className="mt-4 font-(family-name:--font-thank-you) text-[clamp(52px,14vw,80px)] leading-none text-(--invite-text)">
          Thank You
        </div>
      </div>
    </Section>
  );
}
