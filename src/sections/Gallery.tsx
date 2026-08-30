import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import type { InvitationContent } from "../content/invitation.vi";
import { publicUrl } from "../publicUrl";
import { Section } from "./_shared";

export default function Gallery({ content }: { content: InvitationContent }) {
  const slides = useMemo(
    () => content.gallery.images.map((img) => ({ src: img.src, alt: img.alt })),
    [content.gallery.images],
  );
  const [index, setIndex] = useState<number>(-1);
  const imgs = content.gallery.images;

  /** Desktop: 4×2 grid, uniform gaps — no overlapping absolute tiles */
  const desktopTiles = [
    { index: 0, gridClass: "col-start-1 row-start-1 row-span-2" },
    { index: 1, gridClass: "col-start-2 col-span-2 row-start-1" },
    { index: 2, gridClass: "col-start-4 row-start-1" },
    { index: 3, gridClass: "col-start-2 row-start-2" },
    { index: 4, gridClass: "col-start-3 row-start-2" },
    { index: 5, gridClass: "col-start-4 row-start-2" },
  ] as const;

  return (
    <Section id="gallery">
      <div className="w-full min-w-0 text-center">
        <div className="inline-flex items-start p-[10px]">
          <div className="font-sans text-[34px] font-bold leading-[1.2] text-[var(--invite-accent-strong)] md:text-[39px]">
            {content.gallery.title}
          </div>
        </div>

        {/* Small viewports: Figma mosaic uses fixed px positions; use a responsive grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
          {imgs.slice(0, 6).map((img, i) => (
            <button
              key={img.src + String(i)}
              type="button"
              onClick={() => setIndex(i)}
              className="aspect-square w-full overflow-hidden rounded-[10px]"
              aria-label={img.alt ?? `Ảnh ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt ?? ""}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 hidden h-[min(578px,calc(100vw-3rem))] w-full max-w-[1105px] md:grid md:grid-cols-4 md:grid-rows-[1fr_1fr] md:gap-4 lg:gap-5">
          {desktopTiles.map(({ index: i, gridClass }) => {
            const img = imgs[i];
            const fallback = publicUrl(
              `/gallery/${String(i + 1).padStart(2, "0")}.webp`,
            );
            return (
              <button
                key={img?.src ?? String(i)}
                type="button"
                onClick={() => setIndex(i)}
                className={`min-h-0 min-w-0 overflow-hidden rounded-[10px] ${gridClass}`}
                aria-label={img?.alt ?? `Ảnh ${i + 1}`}
              >
                <img
                  src={img?.src ?? fallback}
                  alt={img?.alt ?? ""}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.85)" },
        }}
      />
    </Section>
  );
}
