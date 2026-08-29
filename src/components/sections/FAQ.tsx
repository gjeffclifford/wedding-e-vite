import type { WeddingConfig } from "../../types/wedding";
import { Accordion } from "../ui/Accordion";
import { SectionHeading } from "../ui/SectionHeading";

interface FAQSectionProps {
  wedding: WeddingConfig;
}

export function FAQ({ wedding }: FAQSectionProps) {
  if (wedding.faqs.length === 0) return null;
  return (
    <section className="px-4 py-20">
      <SectionHeading eyebrow="A few notes" title="FAQs" />
      <div className="mx-auto max-w-2xl">
        <Accordion items={wedding.faqs} />
      </div>
    </section>
  );
}
