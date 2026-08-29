import type { AttirePair, WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface AttireGuideProps {
  wedding: WeddingConfig;
}

function AttireBlock({ title, pair }: { title: string; pair: AttirePair }) {
  return (
    <article className="rounded-sm bg-mist/40 p-8 text-center">
      <h3 className="text-xs uppercase tracking-[0.24em] text-gold">{title}</h3>
      <div className="mt-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink/50">Gentlemen</p>
          <p className="mt-2 font-heading text-2xl text-ink">{pair.gentlemen}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink/50">Ladies</p>
          <p className="mt-2 font-heading text-2xl text-ink">{pair.ladies}</p>
        </div>
      </div>
    </article>
  );
}

export function AttireGuide({ wedding }: AttireGuideProps) {
  return (
    <section id="attire" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="Dress code" title="Attire Guide" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <AttireBlock title="Principal Sponsors" pair={wedding.attire.principalSponsors} />
        <AttireBlock title="Guests" pair={wedding.attire.guests} />
      </div>
    </section>
  );
}
