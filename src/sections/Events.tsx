import { useEffect, useState } from "react";
import type { InvitationContent } from "../content/invitation.vi";
import { figmaAssets } from "../figma/assets";
import { Section } from "./_shared";

function parseDdMmYyyy(dateText: string) {
  const m = dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  if (!dd || !mm || !yyyy) return null;
  return { dd, mm, yyyy };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function Countdown({ target }: { target: Date | null }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    updateNow();
    const interval = window.setInterval(updateNow, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const diff =
    target && now !== null ? Math.max(0, target.getTime() - now) : 0;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const items = [
    { value: pad2(days), label: "Ngày" },
    { value: pad2(hours), label: "Giờ" },
    { value: pad2(minutes), label: "Phút" },
    { value: pad2(seconds), label: "Giây" },
  ];

  return (
    <div className="flex w-full max-w-full flex-nowrap items-stretch justify-center gap-0 overflow-hidden rounded-[12px] bg-white shadow-[0px_0px_40px_0px_rgba(231,103,103,0.15)] md:w-auto md:rounded-[20px]">
      {items.map((it, idx) => (
        <div
          key={idx}
          className="min-w-0 flex-1 px-1 py-2 md:px-[30px] md:py-[20px]"
        >
          <div className="px-0.5 text-center font-sans text-[clamp(22px,5.2vw,34px)] font-medium leading-none text-[var(--invite-accent-strong)] md:px-[10px] md:text-[61px] md:leading-[1.2]">
            {it.value}
          </div>
          <div className="mt-1 px-0.5 text-center font-sans text-[11px] font-medium leading-tight text-[var(--invite-accent-strong)] sm:text-[12px] md:mt-0 md:px-[10px] md:text-[31px] md:leading-[1.2]">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

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
  const countdownDate = church?.dateText ? parseDdMmYyyy(church.dateText) : null;
  const countdownTime = church?.timeText?.match(/(\d{1,2}):(\d{2})/);
  const countdownTarget = countdownDate
    ? new Date(
        countdownDate.yyyy,
        countdownDate.mm - 1,
        countdownDate.dd,
        countdownTime ? Number(countdownTime[1]) : 11,
        countdownTime ? Number(countdownTime[2]) : 0,
        0,
      )
    : null;

  return (
    <Section id="events">
      <div className="w-full">
        <div className="text-center font-sans text-[34px] font-bold leading-[1.2] text-[var(--invite-accent-strong)] md:text-[39px]">
          Đếm ngược đến ngày vui
        </div>

        <div className="mt-6 text-center font-sans text-[22px] font-medium leading-[1.35] text-[var(--invite-muted)] md:mt-8 md:text-[20px] md:leading-[1.2]">
          {church?.dateText ?? ""}
        </div>

        <div className="mt-8 flex justify-center">
          <Countdown target={countdownTarget} />
        </div>

        <div className="mt-10 flex w-full min-w-0 flex-col items-stretch gap-6 md:h-[706px] md:flex-row md:items-stretch md:gap-5 lg:gap-6">
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
