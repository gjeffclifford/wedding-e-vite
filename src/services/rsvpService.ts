import type { RSVPData, RSVPResponse, WeddingConfig } from "../types/wedding";

const submittedKeys = new Set<string>();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function uniqueKey(weddingId: string, email: string): string {
  return `${weddingId}:${email.trim().toLowerCase()}`;
}

function resolveEndpoint(wedding: WeddingConfig): string | undefined {
  const fromConfig = wedding.rsvp.apiUrl?.trim();
  if (fromConfig) return fromConfig;
  const fromEnv = import.meta.env.VITE_RSVP_API_URL?.trim();
  return fromEnv || undefined;
}

export function validateRSVP(wedding: WeddingConfig, data: RSVPData): string | null {
  if (!data.fullName.trim()) return "Please enter your full name.";
  if (!data.email.trim()) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(data.email.trim())) return "Please enter a valid email address.";
  if (data.attendance !== "accepts" && data.attendance !== "declines") {
    return "Please tell us whether you will be attending.";
  }
  if (wedding.rsvp.allowAdditionalGuests && data.attendance === "accepts") {
    const guests = data.numberOfGuests ?? 0;
    if (guests < 1) return "Please enter the number of guests.";
    if (guests > wedding.rsvp.maxGuests) {
      return `Please enter a number of guests up to ${wedding.rsvp.maxGuests}.`;
    }
  }
  return null;
}

export async function submitRSVP(
  wedding: WeddingConfig,
  data: RSVPData,
): Promise<RSVPResponse> {
  const validationError = validateRSVP(wedding, data);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const key = uniqueKey(wedding.id, data.email);
  if (submittedKeys.has(key)) {
    return {
      success: false,
      message: "An RSVP with this email was already submitted from this device.",
    };
  }

  const endpoint = resolveEndpoint(wedding);
  if (!endpoint) {
    return {
      success: false,
      message: "RSVP is not configured for this invitation yet.",
    };
  }

  const payload = {
    weddingId: wedding.id,
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    attendance: data.attendance,
    numberOfGuests:
      data.attendance === "accepts"
        ? (data.numberOfGuests ?? (wedding.rsvp.allowAdditionalGuests ? undefined : 1))
        : 0,
    message: data.message?.trim() ?? "",
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, message: "Something went wrong. Please try again." };
    }

    let parsed: Partial<RSVPResponse> = {};
    try {
      parsed = (await response.json()) as Partial<RSVPResponse>;
    } catch {
      parsed = { success: true };
    }

    if (parsed.success === false) {
      return {
        success: false,
        message: parsed.message ?? "Something went wrong. Please try again.",
      };
    }

    submittedKeys.add(key);
    return {
      success: true,
      message: parsed.message ?? "Your RSVP has been received.",
    };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
