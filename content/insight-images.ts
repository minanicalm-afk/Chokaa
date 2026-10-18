const images: Record<string, string> = {
  "boundary-wall-cost-kenya": "/images/masonry-detail.jpg",
  "how-to-read-an-nca-category": "/images/site-foundation.jpg",
  "questions-before-a-construction-contract": "/images/timber-interior.jpg",
};

export function imageForInsight(slug: string) {
  return images[slug] ?? "/images/site-foundation.jpg";
}
