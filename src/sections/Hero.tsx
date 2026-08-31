import type { InvitationContent } from "../content/invitation.vi";
import { publicUrl } from "../publicUrl";
import { Section } from "./_shared";

export default function Hero({ content }: { content: InvitationContent }) {
  const heroBg = content.gallery.images[19];
  return (
    <div className="relative min-h-[520px] h-[min(100svh,680px)] w-full overflow-hidden bg-black md:h-[680px] md:min-h-0">
      <img
        alt={heroBg?.alt ?? ""}
        src={heroBg?.src ?? publicUrl("/gallery/20.webp")}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Section id="top" className="relative flex h-full items-center justify-center">
        <div className="relative mx-auto flex w-full min-w-0 translate-y-[12vh] flex-col items-center px-5 text-center text-white md:translate-y-[6vh] md:px-16 lg:px-24 xl:px-[200px]">
          <div className="w-full min-w-0 px-1 text-center font-(family-name:--font-script) text-[clamp(40px,8vw,72px)] leading-[1.15] md:px-4 md:text-[clamp(34px,5.2vw,72px)] md:leading-[1.2]">
            <div className="flex flex-col items-center md:inline-flex md:flex-row md:flex-nowrap md:justify-center md:whitespace-nowrap">
              <span>{content.couple.groomName}</span>
              <span className="leading-none md:mx-[0.35em] md:shrink-0">&</span>
              <span>{content.couple.brideName}</span>
            </div>
          </div>
          <div className="mt-5 max-w-[22rem] font-sans text-[22px] font-bold leading-[1.3] opacity-95 md:mt-4 md:max-w-none md:text-[20px] md:leading-[1.2]">
            {content.events.find((e) => e.key === "party")?.dateText ?? ""}
          </div>
        </div>
      </Section>
    </div>
  );
}
