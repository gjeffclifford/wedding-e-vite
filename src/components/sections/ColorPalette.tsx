import type { WeddingConfig } from "../../types/wedding";
import { SectionHeading } from "../ui/SectionHeading";

interface ColorPaletteProps {
  wedding: WeddingConfig;
}

export function ColorPalette({ wedding }: ColorPaletteProps) {
  return (
    <section className="px-4 py-12">
      <SectionHeading
        eyebrow="Guest palette"
        title="Recommended Colors"
      />
      <p className="mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed text-ink/70">
        Kindly choose attire within this palette so the celebration photographs beautifully together.
      </p>
      <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-6">
        {wedding.colors.map((color) => (
          <li key={color.hex} className="flex w-24 flex-col items-center text-center">
            <span
              className="block h-16 w-16 rounded-full border border-gold/20 shadow-inner"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <span className="mt-3 text-sm text-ink">{color.name}</span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-wider text-ink/45">{color.hex}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
