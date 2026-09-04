import React from "react";
import Card from "./Card";
import { profile, type ProjectItem } from "@/lib/profile";

function Tile({ project }: { project: ProjectItem }) {
  return (
    <span className="project-tile" style={project.image ? undefined : { background: project.gradient }}>
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" />
      ) : (
        <span className="project-tile-fallback">{project.title}</span>
      )}
    </span>
  );
}

/** Project count beside a looping strip of project thumbnails. */
export default function ProjectsCard({ index }: { index?: number }) {
  const projects = profile.projects;

  return (
    <Card card="projects" index={index}>
      <div className="projects-inner">
        <span className="projects-left">
          <span className="projects-number">{profile.projectsCount}</span>
          <span className="projects-label">
            Advanced
            <br />
            Projects
          </span>
        </span>

        <span className="projects-marquee">
          {/* duplicated so the -50% translate loops seamlessly */}
          <span className="projects-track">
            {[...projects, ...projects].map((p, i) => (
              <Tile key={`${p.title}-${i}`} project={p} />
            ))}
          </span>
        </span>
      </div>
    </Card>
  );
}
