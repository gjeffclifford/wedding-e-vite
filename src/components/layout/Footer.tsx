import type { WeddingConfig } from "../../types/wedding";

interface FooterProps {
  wedding: WeddingConfig;
}

export function Footer({ wedding }: FooterProps) {
  return (
    <footer className="border-t border-gold/15 px-4 py-10 text-center">
      <p className="font-script text-3xl text-ink">{wedding.couple.displayName}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gold">{wedding.wedding.displayDate}</p>
    </footer>
  );
}
