import { useState } from "react";
import type { WeddingConfig } from "../../types/wedding";

export interface NavLink {
  id: string;
  label: string;
}

interface NavbarProps {
  wedding: WeddingConfig;
  links: NavLink[];
  activeId: string;
}

export function Navbar({ wedding, links, activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ivory/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3" aria-label="Invitation">
        <a
          href="#home"
          className="font-script text-2xl text-ink"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("home");
          }}
        >
          {wedding.couple.displayName}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`text-xs uppercase tracking-[0.2em] ${activeId === link.id ? "text-gold" : "text-ink/70 hover:text-ink"}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="min-h-11 min-w-11 text-xs uppercase tracking-[0.2em] text-gold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-gold/15 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="flex min-h-11 items-center text-sm uppercase tracking-[0.18em] text-ink"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
