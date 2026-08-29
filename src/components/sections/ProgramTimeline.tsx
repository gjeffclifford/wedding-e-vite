import type { WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface ProgramTimelineProps {
  wedding: WeddingConfig;
}

export function ProgramTimeline({ wedding }: ProgramTimelineProps) {
  return (
    <section id="program" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="Itinerary" title="Program" />
      <ol className="relative mx-auto max-w-2xl border-l border-gold/30 pl-8 md:max-w-3xl md:border-l-0 md:pl-0">
        {wedding.program.map((event, index) => (
          <li
            key={`${event.time}-${event.title}`}
            className="relative pb-10 last:pb-0 md:grid md:grid-cols-[8rem_1fr] md:gap-10 md:border-l-0"
          >
            <span
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-gold md:hidden"
              aria-hidden="true"
            />
            <p className="text-xs uppercase tracking-[0.2em] text-gold md:pt-1 md:text-right">{event.time}</p>
            <div className="md:border-l md:border-gold/30 md:pl-10">
              <h3 className="mt-1 font-heading text-2xl text-ink md:mt-0">{event.title}</h3>
              {event.description ? (
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{event.description}</p>
              ) : null}
              {index < wedding.program.length - 1 ? (
                <span className="mt-6 hidden h-px w-full bg-gold/20 md:block" aria-hidden="true" />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
