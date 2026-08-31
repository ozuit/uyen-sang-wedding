import type { InvitationContent } from "../content/invitation.vi";
import { figmaAssets } from "../figma/assets";
import { Section } from "./_shared";

function OpenMapButton({ href }: { href: string }) {
  return (
    <a
      className="flex w-full items-center justify-center rounded-[10px] bg-white px-[61px] py-[13px]"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <img alt="" src={figmaAssets.imgMap1} className="h-[35px] w-[38px]" />
      <div className="px-[10px] py-[10px] font-sans text-[19px] font-bold leading-[1.2] text-[var(--invite-accent)] md:text-[16px]">
        Mở bản đồ
      </div>
    </a>
  );
}

export default function Events({ content }: { content: InvitationContent }) {
  const church = content.events.find((e) => e.key === "church");
  const party = content.events.find((e) => e.key === "party");

  return (
    <Section id="events">
      <div className="w-full">
        <div className="flex w-full min-w-0 flex-col items-stretch gap-6 md:h-[706px] md:flex-row md:items-stretch md:gap-5 lg:gap-6">
          <div className="relative w-full min-w-0 flex-1 overflow-hidden rounded-[30px] md:h-[706px] md:min-h-0">
            <img
              alt=""
              src={figmaAssets.imgBeatrizPerezMoyaM2T1J6Fn8WUnsplash1}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 rounded-[30px] bg-black/30" />
            <div className="relative z-10 flex min-h-[520px] w-full min-w-0 flex-col items-center gap-8 px-4 pt-10 pb-8 text-white md:absolute md:inset-x-8 md:top-24 md:bottom-10 md:min-h-0 md:w-auto md:justify-between md:gap-10 md:px-0 md:pt-0 md:pb-0">
              <div className="flex w-full min-w-0 flex-col items-center gap-8 md:gap-[50px]">
                <div className="flex w-full min-w-0 flex-col items-center gap-4 md:gap-[20px]">
                  <img
                    alt=""
                    src={figmaAssets.imgWeddingRing}
                    className="h-[65px] w-[65px]"
                  />
                  <div className="w-full min-w-0 text-center text-[32px] font-bold leading-[1.2] md:text-[39px]">
                    {church?.title ?? "Tiệc nhà trai"}
                  </div>
                </div>
                <div className="flex w-full min-w-0 flex-col items-center gap-1 text-center md:gap-1.5">
                  <div className="text-[22px] font-bold leading-[1.2] md:text-[20px]">
                    {church ? `${church.timeText}` : ""}
                  </div>
                  {church?.dateText ? (
                    <div className="max-w-full min-w-0 break-words px-1 text-[17px] font-medium leading-snug text-white/95 md:text-[18px] md:leading-[1.35]">
                      {church.dateText}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-auto flex w-full min-w-0 flex-col items-center gap-2 md:mt-0 md:gap-[8px]">
                <div className="flex w-full min-w-0 flex-col items-center gap-2 md:gap-[10px]">
                  <div className="w-full min-w-0 break-words px-2 text-center text-[28px] font-bold leading-tight md:px-[10px] md:text-[31px] md:leading-[1.2]">
                    {church?.locationName ?? ""}
                  </div>
                  <div className="w-full min-w-0 break-words px-2 py-2 text-center text-[22px] font-light leading-[1.4] md:py-[10px] md:text-[20px] md:leading-[1.2]">
                    {[...(church?.addressLines ?? []), church?.lunarText]
                      .filter(Boolean)
                      .join(" • ")}
                  </div>
                </div>
                {church?.googleMapsUrl ? (
                  <OpenMapButton href={church.googleMapsUrl} />
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative w-full min-w-0 flex-1 overflow-hidden rounded-[30px] md:h-[706px] md:min-h-0">
            <img
              alt=""
              src={figmaAssets.imgPhotosByLantyO38IdCyV4MUnsplash}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 rounded-[30px] bg-black/30" />
            <div className="relative z-10 flex min-h-[520px] w-full min-w-0 flex-col items-center gap-8 px-4 pt-10 pb-8 text-white md:absolute md:inset-x-8 md:top-24 md:bottom-10 md:min-h-0 md:w-auto md:justify-between md:gap-10 md:px-0 md:pt-0 md:pb-0">
              <div className="flex w-full min-w-0 flex-col items-center gap-8 md:gap-[50px]">
                <div className="flex w-full min-w-0 flex-col items-center gap-4 md:gap-[20px]">
                  <img
                    alt=""
                    src={figmaAssets.imgDinnerTable}
                    className="h-[65px] w-[64px]"
                  />
                  <div className="w-full min-w-0 text-center text-[32px] font-bold leading-[1.2] md:text-[39px]">
                    {party?.title ?? "Tiệc nhà gái"}
                  </div>
                </div>
                <div className="flex w-full min-w-0 flex-col items-center gap-1 text-center md:gap-1.5">
                  <div className="text-[22px] font-bold leading-[1.2] md:text-[20px]">
                    {party ? `${party.timeText}` : ""}
                  </div>
                  {party?.dateText ? (
                    <div className="max-w-full min-w-0 break-words px-1 text-[17px] font-medium leading-snug text-white/95 md:text-[18px] md:leading-[1.35]">
                      {party.dateText}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-auto flex w-full min-w-0 flex-col items-center gap-2 md:mt-0 md:gap-[8px]">
                <div className="flex w-full min-w-0 flex-col items-center gap-2 md:gap-[10px]">
                  <div className="w-full min-w-0 break-words px-2 text-center text-[28px] font-bold leading-tight md:px-[10px] md:text-[31px] md:leading-[1.2]">
                    {party?.locationName ?? ""}
                  </div>
                  <div className="w-full min-w-0 break-words px-2 py-2 text-center text-[22px] font-light leading-[1.4] md:py-[10px] md:text-[20px] md:leading-[1.2]">
                    {[...(party?.addressLines ?? [])].filter(Boolean).join(" • ")}
                  </div>
                </div>
                {party?.googleMapsUrl ? (
                  <OpenMapButton href={party.googleMapsUrl} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
