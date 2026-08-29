import type { WeddingConfig } from "../../types/wedding";

interface ClosingMessageProps {
  wedding: WeddingConfig;
}

export function ClosingMessage({ wedding }: ClosingMessageProps) {
  const { closingMessage, couple } = wedding;
  return (
    <section className="px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-gold">{closingMessage.signOff}</p>
      <p className="mt-6 font-script text-5xl text-ink md:text-6xl">
        {closingMessage.names ?? couple.displayName}
      </p>
      <p className="mx-auto mt-8 max-w-lg whitespace-pre-line font-heading text-xl italic leading-relaxed text-ink/80">
        {closingMessage.body}
      </p>
      {closingMessage.farewell ? (
        <p className="mt-8 font-heading text-lg text-ink">{closingMessage.farewell}</p>
      ) : null}
    </section>
  );
}
