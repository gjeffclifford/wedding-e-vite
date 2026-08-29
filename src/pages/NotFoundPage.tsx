import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { defaultWeddingTheme, themeToCssVars } from "../config/theme";

export function NotFoundPage() {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center bg-ivory px-6 text-center text-ink"
      style={themeToCssVars(defaultWeddingTheme) as CSSProperties}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-gold">Invitation Not Found</p>
      <h1 className="mt-6 font-heading text-4xl md:text-5xl">This invitation is not available.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
        The link may be incorrect, or this wedding has not been published yet.
      </p>
      <Link
        to="/w/allyzza-kenneth"
        className="mt-10 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-gold"
      >
        View the sample invitation
      </Link>
    </div>
  );
}
