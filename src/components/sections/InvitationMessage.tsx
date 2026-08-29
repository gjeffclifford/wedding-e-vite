import type { WeddingConfig } from "../../types/wedding";

interface InvitationMessageProps {
  wedding: WeddingConfig;
}

export function InvitationMessage({ wedding }: InvitationMessageProps) {
  return (
    <section className="px-6 py-8">
      <blockquote className="mx-auto max-w-xl whitespace-pre-line text-center font-heading text-xl leading-relaxed italic text-ink/85 md:text-2xl">
        {wedding.invitationMessage}
      </blockquote>
    </section>
  );
}
