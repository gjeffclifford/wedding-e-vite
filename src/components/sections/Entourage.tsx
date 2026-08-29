import type { Person, WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface EntourageProps {
  wedding: WeddingConfig;
}

function Group({ title, people, subtitle }: { title: string; people: Person[]; subtitle?: string }) {
  if (people.length === 0) return null;
  return (
    <div className="text-center">
      <h3 className="text-xs uppercase tracking-[0.24em] text-gold">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm italic text-ink/60">{subtitle}</p> : null}
      <ul className="mt-4 space-y-2">
        {people.map((person) => (
          <li key={`${title}-${person.name}`} className="font-heading text-xl text-ink">
            {person.name}
            {person.role ? (
              <span className="mt-0.5 block font-body text-xs tracking-[0.12em] text-ink/55">
                {person.role}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Entourage({ wedding }: EntourageProps) {
  const { entourage } = wedding;

  return (
    <section id="entourage" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="Our people" title="Entourage" />
      <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2">
        <Group title="Bride's Parents" people={entourage.bridesParents} />
        <Group title="Groom's Parents" people={entourage.groomsParents} />
        <Group title="Principal Sponsors" people={entourage.principalSponsors.ninong} subtitle="Ninong" />
        <Group title="Principal Sponsors" people={entourage.principalSponsors.ninang} subtitle="Ninang" />
        <Group title="Candle" people={entourage.secondarySponsors.candle} subtitle="Secondary Sponsors" />
        <Group title="Veil" people={entourage.secondarySponsors.veil} subtitle="Secondary Sponsors" />
        <Group title="Cord" people={entourage.secondarySponsors.cord} subtitle="Secondary Sponsors" />
        <Group title="Best Man" people={entourage.bestMan} />
        <Group title="Maid of Honor" people={entourage.maidOfHonor} />
        <Group title="Bride's Siblings" people={entourage.bridesSiblings} />
        <Group title="Groom's Siblings" people={entourage.groomsSiblings} />
        <Group title="Ring Bearer" people={entourage.ringBearer} />
        <Group title="Flower Girls" people={entourage.flowerGirls} />
      </div>
    </section>
  );
}
