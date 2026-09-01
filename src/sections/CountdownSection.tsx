import { useEffect, useState } from "react";
import type { InvitationContent } from "../content/invitation.vi";
import type { InvitationSide } from "../lib/invitationSide";
import { primaryEventForSide } from "../lib/invitationView";
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

export default function CountdownSection({
  content,
  side,
}: {
  content: InvitationContent;
  side: InvitationSide;
}) {
  const primaryEvent = primaryEventForSide(content, side);
  const countdownDate = primaryEvent?.dateText ? parseDdMmYyyy(primaryEvent.dateText) : null;
  const countdownTime = primaryEvent?.timeText?.match(/(\d{1,2}):(\d{2})/);
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
    <Section id="countdown">
      <div className="w-full">
        <div className="text-center font-sans text-[34px] font-bold leading-[1.2] text-[var(--invite-accent-strong)] md:text-[39px]">
          Đếm ngược đến ngày vui
        </div>

        <div className="mt-6 text-center font-sans text-[22px] font-medium leading-[1.35] text-[var(--invite-muted)] md:mt-8 md:text-[20px] md:leading-[1.2]">
          {primaryEvent?.dateText ?? ""}
        </div>

        <div className="mt-8 flex justify-center">
          <Countdown target={countdownTarget} />
        </div>
      </div>
    </Section>
  );
}
