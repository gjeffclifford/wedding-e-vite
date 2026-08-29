import { useState } from "react";
import type { GiftOption, WeddingConfig } from "../../types/wedding";
import { Modal } from "../ui/Modal";
import { SectionHeading } from "../ui/SectionHeading";

interface GiftGuideProps {
  wedding: WeddingConfig;
}

export function GiftGuide({ wedding }: GiftGuideProps) {
  const [selected, setSelected] = useState<GiftOption | null>(null);

  if (wedding.gifts.length === 0) return null;

  return (
    <section className="px-4 py-20">
      <SectionHeading eyebrow="With gratitude" title="Gift Guide" />
      <p className="mx-auto mb-10 max-w-lg text-center text-sm text-ink/70">
        Your presence is enough. Should you wish to send a gift, these options are listed for your convenience.
      </p>
      <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
        {wedding.gifts.map((gift) => (
          <article key={gift.id} className="rounded-sm bg-mist/40 p-6 text-center">
            {gift.logo ? (
              <img src={gift.logo} alt="" className="mx-auto mb-3 h-10 w-auto" />
            ) : null}
            <h3 className="font-heading text-2xl text-ink">{gift.name}</h3>
            {gift.accountName ? (
              <p className="mt-3 text-sm text-ink/80">
                <span className="block text-xs uppercase tracking-[0.16em] text-gold">Account Name</span>
                {gift.accountName}
              </p>
            ) : null}
            {gift.accountNumber ? (
              <p className="mt-3 text-sm text-ink/80">
                <span className="block text-xs uppercase tracking-[0.16em] text-gold">Account Number</span>
                {gift.accountNumber}
              </p>
            ) : null}
            {gift.instructions ? (
              <p className="mt-3 text-xs italic text-ink/55">{gift.instructions}</p>
            ) : null}
            {gift.qrCode ? (
              <button
                type="button"
                className="mx-auto mt-5 block"
                onClick={() => setSelected(gift)}
              >
                <img
                  src={gift.qrCode}
                  alt={`${gift.name} QR code`}
                  className="mx-auto h-36 w-36 bg-white p-2"
                />
                <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-gold">Tap to enlarge</span>
              </button>
            ) : null}
          </article>
        ))}
      </div>
      <Modal
        open={Boolean(selected)}
        title={selected?.name ?? "QR Code"}
        onClose={() => setSelected(null)}
      >
        {selected?.qrCode ? (
          <img src={selected.qrCode} alt={`${selected.name} QR code, enlarged`} className="mx-auto w-full max-w-xs bg-white p-4" />
        ) : null}
      </Modal>
    </section>
  );
}
