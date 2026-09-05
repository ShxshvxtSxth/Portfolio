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
              <LeetCodeCard index={10} />
            </div>
            <div className="cell cell-techstack">
              <TechStackCard index={11} />
            </div>
            <div className="cell cell-vibe">
              <VibeCard index={12} />
            </div>
          </section>

          {/* ---- column 2 ---- */}
          <section className="bento-col bento-col-2">
            <div className="cell cell-certificate">
              <CertificateCard index={13} />
            </div>

            <div className="bento-col bento-col-2-inner">
              <div className="cell cell-club">
                <ClubCard index={14} />
              </div>
              <div className="cell cell-clock">
                <ClockCard index={15} />
              </div>
            </div>

            <div className="cell cell-experience">
              <ExperienceCard index={16} />
            </div>
          </section>

          {/* ---- column 3, centre ---- */}
          <section className="bento-col bento-col-3">
            <div className="cell cell-about">
              <AboutCard index={1} />
            </div>
            <div className="cell cell-hero">
              <HeroCard index={0} />
            </div>
            <div className="cell cell-dock">
              <DockCard index={17} />
            </div>
          </section>

          {/* ---- column 4 ---- */}
          <section className="bento-col bento-col-4">
            <div className="bento-col-4-top">
              <div className="cell cell-trophy">
                <TrophyCard index={18} />
              </div>
              <div className="cell cell-music">
                <MusicCard index={19} />
              </div>
              <div className="cell cell-education">
                <EducationCard index={20} />
              </div>
              <div className="cell cell-ai">
                <AICard index={21} />
              </div>
              <div className="cell cell-github">
                <GithubCard index={22} />
              </div>
            </div>

            <div className="cell cell-projects">
              <ProjectsCard index={23} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
