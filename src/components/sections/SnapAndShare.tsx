import { useState } from "react";
import type { WeddingConfig } from "../../types/wedding";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

interface SnapAndShareProps {
  wedding: WeddingConfig;
}

export function SnapAndShare({ wedding }: SnapAndShareProps) {
  const [copied, setCopied] = useState<"hashtag" | "link" | null>(null);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async (text: string, kind: "hashtag" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const shareInvitation = async () => {
    const url = window.location.href;
    const title = wedding.seo.title;
    if (canShare) {
      try {
        await navigator.share({ title, text: wedding.seo.description, url });
        return;
      } catch {
        /* user cancelled or share failed; fall through to copy */
      }
    }
    await copy(url, "link");
  };

  const social = [
    { label: "Instagram", href: wedding.social.instagram },
    { label: "Facebook", href: wedding.social.facebook },
    { label: "TikTok", href: wedding.social.tiktok },
    { label: "X", href: wedding.social.x },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <section className="px-4 py-20 text-center">
      <SectionHeading eyebrow="Snap & share" title="Share the Day" />
      <p className="font-heading text-3xl text-ink md:text-4xl">{wedding.snapShare.hashtag}</p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button
          variant="ghost"
          onClick={() => copy(wedding.snapShare.hashtag, "hashtag")}
        >
          {copied === "hashtag" ? "Hashtag copied!" : "Copy Hashtag"}
        </Button>
        <Button onClick={shareInvitation}>
          {canShare ? "Share Invitation" : copied === "link" ? "Link copied!" : "Copy Invitation Link"}
        </Button>
      </div>
      {social.length > 0 ? (
        <ul className="mt-10 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.2em] text-gold">
          {social.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer" className="min-h-11 inline-flex items-center">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-ink/50">
        Tag your photos with the hashtag when you share them. This invitation does not collect posts from social
        networks.
      </p>
    </section>
  );
}
