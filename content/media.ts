export const imageAlt: Record<string, string> = {
  "/images/runda-house.jpg":
    "Single-storey limestone house with a timber-lined roof overhang, cabro forecourt and bougainvillea",
  "/images/karen-drive.jpg":
    "Dressed stone boundary wall and charcoal-and-terracotta cabro drive",
  "/images/westlands-office.jpg":
    "Limestone reception with a long timber desk and linen curtains",
  "/images/kiambu-before.jpg":
    "Single-storey house before renovation, with peeling render, a rusted mabati roof and a cracked path",
  "/images/kiambu-after.jpg":
    "The same house after renovation, in warm limewash with new timber windows and a cabro path",
  "/images/muthaiga-house.jpg":
    "Two-storey garden house with a clay tile roof, deep veranda and stone terrace",
  "/images/nakuru-road.jpg":
    "Paved access road with a stone-lined drain through dry Rift Valley grassland",
  "/images/nyali-court.jpg":
    "White coral-stone courtyard with arches, a timber screen and palm shade",
  "/images/site-foundation.jpg":
    "Reinforced strip foundation in timber formwork on red soil, with concrete blocks stacked beside it",
  "/images/masonry-detail.jpg":
    "Dressed stone wall meeting warm lime plaster, finished with a terracotta coping",
  "/images/timber-interior.jpg":
    "Empty room with a built-in timber bench, timber floor and a linen curtain",
  "/images/cabro-detail.jpg":
    "Charcoal and terracotta interlocking pavers beside a stone edge",
};

export function altFor(src: string | null | undefined, fallback: string) {
  if (!src) return fallback;
  return imageAlt[src] ?? fallback;
}
