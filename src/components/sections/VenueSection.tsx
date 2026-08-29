import type { Venue, WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface VenueSectionProps {
  wedding: WeddingConfig;
}

function VenueCard({ title, venue }: { title: string; venue: Venue }) {
  return (
    <article className="overflow-hidden rounded-sm bg-mist/40">
      {venue.image ? (
        <img src={venue.image} alt="" className="h-48 w-full object-cover" />
      ) : null}
      <div className="p-6">
        <h3 className="text-xs uppercase tracking-[0.24em] text-gold">{title}</h3>
        <p className="mt-3 font-heading text-2xl text-ink">{venue.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{venue.address}</p>
        <p className="mt-3 text-sm tracking-[0.12em] text-ink">{venue.time}</p>
        {venue.mapsUrl ? (
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
          >
            View on Google Maps
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function VenueSection({ wedding }: VenueSectionProps) {
  return (
    <section id="details" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="When & where" title="Ceremony & Reception" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <VenueCard title="Ceremony" venue={wedding.ceremony} />
        <VenueCard title="Reception" venue={wedding.reception} />
      </div>
    </section>
  );
}
