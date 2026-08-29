/** Interpret a local ISO datetime string in a named IANA timezone. */
export function zonedDateTimeToUtcMs(dateTime: string, timeZone: string): number {
  const [datePart, timePart = "00:00:00"] = dateTime.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second = "0"] = timePart.split(":");
  const utcGuess = Date.UTC(year, month - 1, day, Number(hour), Number(minute), Number(second));
  const offset = getTimeZoneOffsetMs(utcGuess, timeZone);
  const adjusted = utcGuess - offset;
  const offset2 = getTimeZoneOffsetMs(adjusted, timeZone);
  return utcGuess - offset2;
}

function getTimeZoneOffsetMs(utcMs: number, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = formatter.formatToParts(new Date(utcMs));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");
  let hour = get("hour");
  if (hour === 24) hour = 0;
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), hour, get("minute"), get("second"));
  return asUtc - utcMs;
}

export function pad(value: number): string {
  return String(Math.max(0, value)).padStart(2, "0");
}
