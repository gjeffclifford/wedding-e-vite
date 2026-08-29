import { useCallback, useRef, useState } from "react";
import type { WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface GalleryProps {
  wedding: WeddingConfig;
}

export function Gallery({ wedding }: GalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const images = wedding.gallery;

  const goTo = useCallback(
    (next: number) => {
      const clamped = (next + images.length) % images.length;
      const node = scrollerRef.current;
      if (!node) return;
      const child = node.children[clamped] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setIndex(clamped);
    },
    [images.length],
  );

  const onScroll = () => {
    const node = scrollerRef.current;
    if (!node) return;
    const children = Array.from(node.children) as HTMLElement[];
    const center = node.scrollLeft + node.clientWidth / 2;
    let closest = 0;
    let dist = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const d = Math.abs(childCenter - center);
      if (d < dist) {
        dist = d;
        closest = i;
      }
    });
    setIndex(closest);
  };

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="Moments" title="Gallery" />
      <div className="mx-auto max-w-4xl">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <figure
              key={image.src}
              className="min-w-[85%] shrink-0 snap-center sm:min-w-[70%] md:min-w-[55%]"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
              {image.caption ? (
                <figcaption className="mt-3 text-center font-heading text-lg italic text-ink/70">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="min-h-11 min-w-11 text-gold"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Gallery pagination">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Photo ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-gold" : "bg-gold/30"}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="min-h-11 min-w-11 text-gold"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
