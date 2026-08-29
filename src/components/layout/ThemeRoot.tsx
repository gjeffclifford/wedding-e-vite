import { useMemo, type CSSProperties, type ReactNode } from "react";
import { themeToCssVars } from "../../config/theme";
import type { WeddingTheme } from "../../types/wedding";

interface ThemeRootProps {
  theme: WeddingTheme;
  children: ReactNode;
}

export function ThemeRoot({ theme, children }: ThemeRootProps) {
  const style = useMemo(() => themeToCssVars(theme) as CSSProperties, [theme]);
  return (
    <div className="min-h-svh bg-ivory text-ink font-body" style={style}>
      {children}
    </div>
  );
}
