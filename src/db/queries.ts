import { and, asc, desc, eq, isNull } from "drizzle-orm";
import {
  catalogInsights,
  catalogProjects,
  catalogServices,
  catalogTestimonials,
} from "@/content/catalog";
import type { ProjectSector } from "@/lib/types";
import { getDb } from "./index";
import { insights, projects, services, testimonials } from "./schema";

function databaseEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

export async function listProjects(filters?: {
  sector?: ProjectSector;
  county?: string;
  featured?: boolean;
}) {
  if (!databaseEnabled()) {
    return catalogProjects
      .filter((project) => !project.deletedAt)
      .filter((project) => (filters?.sector ? project.sector === filters.sector : true))
      .filter((project) => (filters?.county ? project.county === filters.county : true))
      .filter((project) => (filters?.featured ? project.featured : true))
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));
  }

  const db = getDb();
  const conditions = [isNull(projects.deletedAt)];
  if (filters?.sector) conditions.push(eq(projects.sector, filters.sector));
  if (filters?.county) conditions.push(eq(projects.county, filters.county));
  if (filters?.featured) conditions.push(eq(projects.featured, true));

  return db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(desc(projects.year), asc(projects.name));
}

export async function listProjectSlugs() {
  const rows = await listProjects();
  return rows.map((project) => ({ slug: project.slug }));
}

export async function getProjectBySlug(slug: string) {
  if (!databaseEnabled()) {
    return catalogProjects.find((project) => project.slug === slug && !project.deletedAt) ?? null;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), isNull(projects.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getNextProject(slug: string) {
  const all = await listProjects();
  if (all.length < 2) return null;
  const index = all.findIndex((project) => project.slug === slug);
  if (index === -1) return all[0] ?? null;
  return all[(index + 1) % all.length] ?? null;
}

export async function listServices() {
  if (!databaseEnabled()) {
    return catalogServices
      .filter((service) => !service.deletedAt)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  }

  const db = getDb();
  return db
    .select()
    .from(services)
    .where(isNull(services.deletedAt))
    .orderBy(asc(services.sortOrder), asc(services.name));
}

export async function listServiceSlugs() {
  const rows = await listServices();
  return rows.map((service) => ({ slug: service.slug }));
}

export async function getServiceBySlug(slug: string) {
  if (!databaseEnabled()) {
    return catalogServices.find((service) => service.slug === slug && !service.deletedAt) ?? null;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(services)
    .where(and(eq(services.slug, slug), isNull(services.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function listInsights() {
  if (!databaseEnabled()) {
    return catalogInsights
      .filter((insight) => !insight.deletedAt)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  const db = getDb();
  return db
    .select()
    .from(insights)
    .where(isNull(insights.deletedAt))
    .orderBy(desc(insights.publishedAt));
}

export async function listInsightSlugs() {
  const rows = await listInsights();
  return rows.map((insight) => ({ slug: insight.slug }));
}

export async function getInsightBySlug(slug: string) {
  if (!databaseEnabled()) {
    return catalogInsights.find((insight) => insight.slug === slug && !insight.deletedAt) ?? null;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(insights)
    .where(and(eq(insights.slug, slug), isNull(insights.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getFeaturedTestimonial() {
  if (!databaseEnabled()) {
    return catalogTestimonials.find((item) => item.featured && !item.deletedAt) ?? null;
  }

  const db = getDb();
  const rows = await db
    .select()
    .from(testimonials)
    .where(and(eq(testimonials.featured, true), isNull(testimonials.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function listProjectsForService(slug: string) {
  const sector =
    slug === "commercial-fitout-nairobi"
      ? "commercial"
      : slug === "home-renovation-nairobi"
        ? "renovation"
        : slug === "boundary-wall-cost-kenya" || slug === "cabro-paving-nairobi" || slug === "civil-works"
          ? "civil"
          : undefined;

  if (slug === "boundary-wall-cost-kenya" || slug === "cabro-paving-nairobi") {
    const all = await listProjects();
    return all.filter((project) =>
      ["boundary-and-drive-karen", "house-on-mimosa-runda", "access-road-nakuru"].includes(project.slug),
    );
  }

  if (!sector) return listProjects();
  return listProjects({ sector });
}
