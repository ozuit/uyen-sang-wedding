import type { InvitationContent } from "../content/invitation.vi";
import type { InvitationSide } from "../lib/invitationSide";
import { groomNameFirst } from "../lib/invitationView";
import { publicUrl } from "../publicUrl";
import { Section } from "./_shared";

function CouplePortrait({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="flex justify-center">
      <div
        className="rounded-full p-1.5 shadow-[0_8px_28px_rgba(183,11,157,0.22)]"
        style={{
          background:
            "linear-gradient(145deg, var(--invite-accent), var(--invite-accent-strong))",
        }}
      >
        <img
          alt={alt}
          src={src}
          className="block h-[240px] w-[240px] rounded-full object-cover"
        />
      </div>
    </div>
  );
}

function GroomProfile({ content }: { content: InvitationContent }) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-5 md:max-w-none">
      <CouplePortrait
        alt={content.couple.groomName}
        src={content.gallery.images[1]?.src ?? publicUrl("/gallery/02.webp")}
      />
      <div className="text-center">
        <div className="w-full text-center font-(family-name:--font-script) text-[clamp(38px,8.5vw,60px)] leading-[1.2] text-[#a40781] whitespace-normal md:whitespace-nowrap md:text-[clamp(32px,7vw,60px)]">
          {content.couple.groomName}
        </div>
        <div className="mt-3 text-[22px] leading-[1.4] text-(--invite-text) md:text-[20px] md:leading-[1.2]">
          <div className="font-light">Song thân</div>
          {content.families.groomParents.map((line) => (
            <div key={line} className="font-medium">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrideProfile({ content }: { content: InvitationContent }) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-5 md:max-w-none">
      <CouplePortrait
        alt={content.couple.brideName}
        src={content.gallery.images[2]?.src ?? publicUrl("/gallery/03.webp")}
      />
      <div className="text-center">
        <div className="w-full text-center font-(family-name:--font-script) text-[clamp(38px,8.5vw,60px)] leading-[1.2] text-[#a40781] whitespace-normal md:whitespace-nowrap md:text-[clamp(32px,7vw,60px)]">
          {content.couple.brideName}
        </div>
        <div className="mt-3 text-[22px] leading-[1.4] text-(--invite-text) md:text-[20px] md:leading-[1.2]">
          <div className="font-light">Song thân</div>
          {content.families.brideParents.map((line) => (
            <div key={line} className="font-medium">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CoupleIntro({
  content,
  side,
}: {
  content: InvitationContent;
  side: InvitationSide;
}) {
  const groomFirst = groomNameFirst(side);

  return (
    <Section id="couple">
      <div className="w-full rounded-[20px] bg-white px-5 py-8 shadow-[0px_0px_40px_0px_rgba(231,103,103,0.15)] md:px-[60px] md:py-[48px]">
        <div className="text-center">
          <div className="font-sans text-[34px] font-bold leading-[1.2] text-(--invite-accent-strong) md:text-[39px]">
            Hai bên gia đình
          </div>
          <div className="mx-auto mt-3 w-full text-center font-sans text-[22px] font-medium leading-[1.45] text-(--invite-muted) md:text-[20px] md:leading-[1.2]">
            Rất vinh dự được đón tiếp
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-10 md:mt-12 md:flex-row md:items-start md:gap-10 lg:gap-16">
          {groomFirst ? (
            <>
              <GroomProfile content={content} />
              <BrideProfile content={content} />
            </>
          ) : (
            <>
              <BrideProfile content={content} />
              <GroomProfile content={content} />
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
