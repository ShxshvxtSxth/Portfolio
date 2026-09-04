"use client";

import React, { useCallback, useState } from "react";
import Loader from "@/components/bento/Loader";
import LeetCodeCard from "@/components/bento/LeetCodeCard";
import TechStackCard from "@/components/bento/TechStackCard";
import VibeCard from "@/components/bento/VibeCard";
import CertificateCard from "@/components/bento/CertificateCard";
import ClubCard from "@/components/bento/ClubCard";
import ClockCard from "@/components/bento/ClockCard";
import ExperienceCard from "@/components/bento/ExperienceCard";
import AboutCard from "@/components/bento/AboutCard";
import HeroCard from "@/components/bento/HeroCard";
import DockCard from "@/components/bento/DockCard";
import TrophyCard from "@/components/bento/TrophyCard";
import MusicCard from "@/components/bento/MusicCard";
import EducationCard from "@/components/bento/EducationCard";
import AICard from "@/components/bento/AICard";
import GithubCard from "@/components/bento/GithubCard";
import ProjectsCard from "@/components/bento/ProjectsCard";

/**
 * The whole page is one fixed-ratio composition (1790 x 1001) that scales to
 * the viewport, so the bento never scrolls on desktop. Column and row ratios
 * are the fr values the layout was designed against.
 */
export default function Home() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onDone={onLoaderDone} />

      <main className="bento-viewport">
        <div className="bento-grid" data-ready={ready}>
          {/* ---- column 1 ---- */}
          <section className="bento-col bento-col-1">
            <div className="cell cell-leetcode">
              <LeetCodeCard index={0} />
            </div>
            <div className="cell cell-techstack">
              <TechStackCard index={3} />
            </div>
            <div className="cell cell-vibe">
              <VibeCard index={6} />
            </div>
          </section>

          {/* ---- column 2 ---- */}
          <section className="bento-col bento-col-2">
            <div className="cell cell-certificate">
              <CertificateCard index={1} />
            </div>

            <div className="bento-col bento-col-2-inner">
              <div className="cell cell-club">
                <ClubCard index={4} />
              </div>
              <div className="cell cell-clock">
                <ClockCard index={5} />
              </div>
            </div>

            <div className="cell cell-experience">
              <ExperienceCard index={7} />
            </div>
          </section>

          {/* ---- column 3, centre ---- */}
          <section className="bento-col bento-col-3">
            <div className="cell cell-about">
              <AboutCard index={2} />
            </div>
            <div className="cell cell-hero">
              <HeroCard index={2} />
            </div>
            <div className="cell cell-dock">
              <DockCard index={8} />
            </div>
          </section>

          {/* ---- column 4 ---- */}
          <section className="bento-col bento-col-4">
            <div className="bento-col-4-top">
              <div className="cell cell-trophy">
                <TrophyCard index={3} />
              </div>
              <div className="cell cell-music">
                <MusicCard index={4} />
              </div>
              <div className="cell cell-education">
                <EducationCard index={5} />
              </div>
              <div className="cell cell-ai">
                <AICard index={6} />
              </div>
              <div className="cell cell-github">
                <GithubCard index={7} />
              </div>
            </div>

            <div className="cell cell-projects">
              <ProjectsCard index={8} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
