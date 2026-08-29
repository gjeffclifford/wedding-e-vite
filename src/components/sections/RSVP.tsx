import { useState, type FormEvent } from "react";
import { submitRSVP, validateRSVP } from "../../services/rsvpService";
import type { RSVPData, WeddingConfig } from "../../types/wedding";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

interface RSVPProps {
  wedding: WeddingConfig;
}

type Status = "idle" | "success" | "error";

function isValidationMessage(message: string): boolean {
  return /please |already submitted|not configured/i.test(message);
}

export function RSVP({ wedding }: RSVPProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState<RSVPData["attendance"] | "">("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  if (!wedding.rsvp.enabled) return null;

  const showGuestCount = wedding.rsvp.allowAdditionalGuests && attendance === "accepts";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data: RSVPData = {
      fullName,
      email,
      attendance: attendance || "declines",
      numberOfGuests: showGuestCount ? numberOfGuests : 1,
      message,
    };

    if (!attendance) {
      setStatus("error");
      setFeedback("Please tell us whether you will be attending.");
      return;
    }

    const invalid = validateRSVP(wedding, data);
    if (invalid) {
      setStatus("error");
      setFeedback(invalid);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    const result = await submitRSVP(wedding, data);
    setIsSubmitting(false);
    setStatus(result.success ? "success" : "error");
    setFeedback(result.message);
  };

  if (status === "success") {
    return (
      <section id="rsvp" className="scroll-mt-24 px-4 py-20 text-center">
        <SectionHeading title="Thank you!" />
        <p className="mx-auto max-w-md font-heading text-xl text-ink/80">Your RSVP has been received.</p>
        <p className="mt-4 text-sm text-ink/70">We can't wait to celebrate with you!</p>
      </section>
    );
  }

  return (
    <section id="rsvp" className="scroll-mt-24 px-4 py-20">
      <SectionHeading eyebrow="Kindly reply" title="RSVP" />
      <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-5" noValidate>
        <div>
          <label htmlFor="rsvp-name" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
            Full Name *
          </label>
          <input
            id="rsvp-name"
            name="fullName"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="min-h-11 w-full rounded-sm border border-gold/25 bg-ivory px-3 py-2 text-ink"
          />
        </div>
        <div>
          <label htmlFor="rsvp-email" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
            Email Address *
          </label>
          <input
            id="rsvp-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-11 w-full rounded-sm border border-gold/25 bg-ivory px-3 py-2 text-ink"
          />
        </div>
        <fieldset>
          <legend className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Will you be attending? *</legend>
          <div className="space-y-2">
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="attendance"
                value="accepts"
                checked={attendance === "accepts"}
                onChange={() => setAttendance("accepts")}
              />
              Joyfully Accepts
            </label>
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="attendance"
                value="declines"
                checked={attendance === "declines"}
                onChange={() => setAttendance("declines")}
              />
              Regretfully Declines
            </label>
          </div>
        </fieldset>
        {showGuestCount ? (
          <div>
            <label htmlFor="rsvp-guests" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
              Number of Guests
            </label>
            <input
              id="rsvp-guests"
              name="numberOfGuests"
              type="number"
              min={1}
              max={wedding.rsvp.maxGuests}
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(Number(e.target.value))}
              className="min-h-11 w-full rounded-sm border border-gold/25 bg-ivory px-3 py-2 text-ink"
            />
          </div>
        ) : null}
        <div>
          <label htmlFor="rsvp-message" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
            Message
          </label>
          <textarea
            id="rsvp-message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-sm border border-gold/25 bg-ivory px-3 py-2 text-ink"
          />
        </div>
        {status === "error" && feedback ? (
          <p className="text-sm text-ink" role="alert">
            {isValidationMessage(feedback) ? feedback : "Something went wrong. Please try again."}
          </p>
        ) : null}
        <Button type="submit" disabled={isSubmitting} className="w-full text-beautiful-navy">
          {isSubmitting ? "Submitting..." : "Confirm RSVP"}
        </Button>
      </form>
    </section>
  );
}
