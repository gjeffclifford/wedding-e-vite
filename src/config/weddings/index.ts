import type { WeddingConfig } from "../../types/wedding";
import { allyzzaKennethWedding } from "./allyzza-kenneth";

const weddings: WeddingConfig[] = [allyzzaKennethWedding];

const byId = new Map(weddings.map((wedding) => [wedding.id, wedding]));

export function getWeddingBySlug(slug: string): WeddingConfig | undefined {
  return byId.get(slug);
}

export function listWeddings(): WeddingConfig[] {
  return weddings;
}
