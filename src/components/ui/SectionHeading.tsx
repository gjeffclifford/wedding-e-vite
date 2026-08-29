interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ eyebrow, title, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <header className="mx-auto mb-10 max-w-xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      ) : null}
      <Tag className="font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">{title}</Tag>
    </header>
  );
}
