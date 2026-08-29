import type { WeddingTheme } from "../types/wedding";

export const defaultWeddingTheme: WeddingTheme = {
  colors: {
    background: "#f6f1e8",
    foreground: "#3a342c",
    primary: "#8a7a5a",
    secondary: "#c4b49a",
    accent: "#9aa88a",
    muted: "#e8dfd0",
  },
  fonts: {
    heading: '"Cormorant Garamond", serif',
    body: '"DM Sans", sans-serif',
    script: '"Great Vibes", cursive',
  },
};

export function themeToCssVars(theme: WeddingTheme): Record<string, string> {
  const fonts = { ...defaultWeddingTheme.fonts, ...theme.fonts };
  return {
    "--wedding-background": theme.colors.background,
    "--wedding-foreground": theme.colors.foreground,
    "--wedding-primary": theme.colors.primary,
    "--wedding-secondary": theme.colors.secondary,
    "--wedding-accent": theme.colors.accent,
    "--wedding-muted": theme.colors.muted,
    "--wedding-font-heading": fonts.heading ?? defaultWeddingTheme.fonts!.heading!,
    "--wedding-font-body": fonts.body ?? defaultWeddingTheme.fonts!.body!,
    "--wedding-font-script": fonts.script ?? defaultWeddingTheme.fonts!.script!,
  };
}
