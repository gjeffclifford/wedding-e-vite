import type { WeddingConfig } from "../../types/wedding";
import { Button } from "../ui/Button";

interface HeroProps {
  wedding: WeddingConfig;
  invitationOpen: boolean;
  onOpen: () => void;
}

export function Hero({ wedding, invitationOpen, onOpen }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center scroll-mt-20"
    >
      {wedding.hero.image ? (
        <img
          src={wedding.hero.image}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
      ) : null}
      <div className="absolute inset-0 bg-ivory/55" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="mb-6 text-xs uppercase tracking-[0.32em] text-gold">{wedding.hero.familiesLine}</p>
        <h1 className="font-script text-[clamp(2.75rem,12vw,5.5rem)] leading-[1.1] text-ink">
          {wedding.couple.displayName}
        </h1>
        <p className="mt-8 whitespace-pre-line font-heading text-xl italic text-ink/80 md:text-2xl">
          {wedding.hero.inviteLine}
        </p>
        <p className="mt-10 font-heading text-2xl tracking-wide text-ink md:text-3xl">
          {wedding.wedding.displayDate}
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold">{wedding.ceremony.name}</p>
        {!invitationOpen ? (
          <div className="mt-12">
            <Button onClick={onOpen} className="text-beautiful-navy">{wedding.hero.openButtonLabel}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
