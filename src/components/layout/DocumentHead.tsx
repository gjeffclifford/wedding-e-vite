import { useEffect } from "react";
import type { WeddingConfig } from "../../types/wedding";

interface DocumentHeadProps {
  wedding: WeddingConfig;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.includes("property=")
      ? ["property", selector.match(/property="([^"]+)"/)?.[1] ?? ""]
      : ["name", selector.match(/name="([^"]+)"/)?.[1] ?? ""];
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function DocumentHead({ wedding }: DocumentHeadProps) {
  useEffect(() => {
    document.title = wedding.seo.title;
    setMeta('meta[name="description"]', "content", wedding.seo.description);
    setMeta('meta[property="og:title"]', "content", wedding.seo.title);
    setMeta('meta[property="og:description"]', "content", wedding.seo.description);
    setMeta('meta[property="og:type"]', "content", "website");
    if (wedding.seo.ogImage) {
      const image = new URL(wedding.seo.ogImage, window.location.origin).href;
      setMeta('meta[property="og:image"]', "content", image);
    }
  }, [wedding]);

  return null;
}
