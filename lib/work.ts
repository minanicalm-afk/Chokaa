import type { Project } from "@/lib/types";

export type WorkProject = {
  id: string;
  slug: string;
  name: string;
  sector: string;
  location: string;
  county: string;
  year: number | null;
  duration: string | null;
  role: string | null;
  contractBand: string | null;
  status: string;
  scope: string[];
  coverImage: string | null;
  latitude: number | null;
  longitude: number | null;
};

export function toWorkProject(project: Project): WorkProject {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    sector: project.sector,
    location: project.location,
    county: project.county,
    year: project.year,
    duration: project.duration,
    role: project.role,
    contractBand: project.contractBand,
    status: project.status,
    scope: project.scope,
    coverImage: project.coverImage,
    latitude: project.latitude,
    longitude: project.longitude,
  };
}
