import { useMemo, useState } from "react";
import { DocumentHead } from "../components/layout/DocumentHead";
import { Footer } from "../components/layout/Footer";
import { Navbar, type NavLink } from "../components/layout/Navbar";
import { ThemeRoot } from "../components/layout/ThemeRoot";
import { AttireGuide } from "../components/sections/AttireGuide";
import { ClosingMessage } from "../components/sections/ClosingMessage";
import { ColorPalette } from "../components/sections/ColorPalette";
import { Countdown } from "../components/sections/Countdown";
import { Entourage } from "../components/sections/Entourage";
import { FAQ } from "../components/sections/FAQ";
import { Gallery } from "../components/sections/Gallery";
import { GiftGuide } from "../components/sections/GiftGuide";
import { Hero } from "../components/sections/Hero";
import { InvitationMessage } from "../components/sections/InvitationMessage";
import { ProgramTimeline } from "../components/sections/ProgramTimeline";
import { RSVP } from "../components/sections/RSVP";
import { SnapAndShare } from "../components/sections/SnapAndShare";
import { VenueSection } from "../components/sections/VenueSection";
import { useActiveSection } from "../hooks/useActiveSection";
import type { WeddingConfig } from "../types/wedding";

interface InvitationPageProps {
  wedding: WeddingConfig;
}

const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "details", label: "Details" },
  { id: "entourage", label: "Entourage" },
  { id: "attire", label: "Attire" },
  { id: "program", label: "Program" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

export function InvitationPage({ wedding }: InvitationPageProps) {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), []);
  const activeId = useActiveSection(invitationOpen ? sectionIds : ["home"]);

  const openInvitation = () => {
    setInvitationOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <ThemeRoot theme={wedding.theme}>
      <DocumentHead wedding={wedding} />
      {invitationOpen ? <Navbar wedding={wedding} links={NAV_LINKS} activeId={activeId} /> : null}
      <main>
        <Hero wedding={wedding} invitationOpen={invitationOpen} onOpen={openInvitation} />
        {invitationOpen ? (
          <div className="animate-[fadeIn_0.6s_ease]">
            <div id="countdown">
              <Countdown wedding={wedding} />
            </div>
            <InvitationMessage wedding={wedding} />
            <VenueSection wedding={wedding} />
            <Entourage wedding={wedding} />
            <AttireGuide wedding={wedding} />
            <ColorPalette wedding={wedding} />
            <ProgramTimeline wedding={wedding} />
            <Gallery wedding={wedding} />
            <RSVP wedding={wedding} />
            <GiftGuide wedding={wedding} />
            <SnapAndShare wedding={wedding} />
            <FAQ wedding={wedding} />
            <ClosingMessage wedding={wedding} />
          </div>
        ) : null}
      </main>
      {invitationOpen ? <Footer wedding={wedding} /> : null}
    </ThemeRoot>
  );
}
