import { useId, useState } from "react";
import type { FAQ } from "../../types/wedding";

interface AccordionProps {
  items: FAQ[];
}

export function Accordion({ items }: AccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gold/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left font-heading text-xl text-ink"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="text-gold">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-4 text-sm leading-relaxed text-ink/80"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
