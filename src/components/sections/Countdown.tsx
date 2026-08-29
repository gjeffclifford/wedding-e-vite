import { useCountdown } from "../../hooks/useCountdown";
import type { WeddingConfig } from "../../types/wedding";
import { pad } from "../../utils/datetime";
import { SectionHeading } from "../ui/SectionHeading";

interface CountdownProps {
  wedding: WeddingConfig;
}

function Unit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-1 flex-col items-center rounded-sm bg-mist/70 px-3 py-4">
      <span className="font-heading text-3xl text-ink md:text-4xl">{value}</span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">{label}</span>
    </div>
  );
}

export function Countdown({ wedding }: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(
    wedding.wedding.date,
    wedding.wedding.timezone,
  );

  return (
    <section className="px-4 py-20" aria-live="polite">
      <SectionHeading eyebrow="The day we'll finally say I do" title={wedding.wedding.displayDate} />
      {isComplete ? (
        <p className="text-center font-heading text-3xl text-ink">Today is the Day!</p>
      ) : (
        <div className="mx-auto flex max-w-lg gap-2">
          <Unit label="Days" value={String(days)} />
          <Unit label="Hours" value={pad(hours)} />
          <Unit label="Minutes" value={pad(minutes)} />
          <Unit label="Seconds" value={pad(seconds)} />
        </div>
      )}
    </section>
  );
}
