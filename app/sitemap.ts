import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { listInsights, listProjects, listServices } from "@/src/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, insights] = await Promise.all([
    listProjects(),
    listServices(),
    listInsights(),
  ]);

  const staticPaths = [
    "",
    "/work",
    "/services",
    "/about",
    "/insights",
    "/contact",
    "/procurement",
    "/capability-statement",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: project.updatedAt,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    ...insights.map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: insight.publishedAt,
    })),
  ];
}
