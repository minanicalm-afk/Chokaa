"use client";

import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { WorkProject } from "@/lib/work";
import { sectorLabel } from "@/components/ProjectCard";

const pin = L.divIcon({
  className: "",
  html: '<span style="display:block;width:12px;height:12px;background:#B5623C;border:1px solid #1F1D1B"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function ProjectMap({ projects }: { projects: WorkProject[] }) {
  const pins = projects.filter(
    (project) => project.latitude != null && project.longitude != null,
  );

  return (
    <div className="relative isolate z-0 h-[32rem] border border-limestone">
      <MapContainer
        center={[0.15, 37.4]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full bg-ivory"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((project) => (
          <Marker
            key={project.id}
            position={[project.latitude as number, project.longitude as number]}
            icon={pin}
          >
            <Popup>
              <span className="block font-serif text-base text-charcoal">{project.name}</span>
              <span className="mt-1 block text-xs text-neutral-600">
                {sectorLabel(project.sector)} · {project.location}
              </span>
              <Link href={`/work/${project.slug}`} className="mt-2 inline-block text-sm underline">
                Open the case study
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
