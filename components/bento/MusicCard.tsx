"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import Card from "./Card";
import { profile } from "@/lib/profile";

const BARS = 20;
const IDLE = Array.from({ length: BARS }, (_, i) => Math.round(14 + Math.abs(Math.sin(i)) * 22));

/**
 * Now-playing strip. The play button streams the local track and the waveform
 * is driven by the real audio through a Web Audio analyser; the album tile
 * still links out to Spotify.
 */
export default function MusicCard({ index }: { index?: number }) {
  const [levels, setLevels] = useState<number[]>(IDLE);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  /** Built lazily on first play — an AudioContext may only start from a gesture. */
  const connectAnalyser = useCallback(() => {
    if (analyserRef.current || !audioRef.current) return;
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    try {
      const ctx = new Ctor();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    } catch {
      // no analyser available — the bars fall back to the idle pattern
    }
  }, []);

  // sample the analyser while the track plays
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setLevels(IDLE);
      return;
    }

    const analyser = analyserRef.current;
    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const tick = () => {
      if (analyser && data) {
        analyser.getByteFrequencyData(data);
        const step = Math.max(1, Math.floor(data.length / BARS));
        setLevels(
          Array.from({ length: BARS }, (_, i) => {
            const v = data[i * step] ?? 0;
            return 12 + (v / 255) * 88;
          })
        );
      } else {
        setLevels(Array.from({ length: BARS }, () => 18 + Math.random() * 82));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      connectAnalyser();
      await ctxRef.current?.resume().catch(() => undefined);
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const title = `${profile.nowPlaying.track} — ${profile.nowPlaying.artist}`;

  return (
    <Card card="music" index={index} arrow={false}>
      <a
        className="music-album"
        href={profile.nowPlaying.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${profile.nowPlaying.track} on Spotify`}
        title="Open on Spotify"
      >
        <span
          className="music-album-blur"
          style={{
            backgroundImage: `url(${profile.nowPlaying.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <span className="music-album-cover" aria-hidden>
          <Image
            src={profile.nowPlaying.cover}
            alt={`${profile.nowPlaying.track} album art`}
            fill
            sizes="120px"
            className="w-full h-full object-cover rounded-[inherit]"
          />
        </span>
      </a>

      <span className="music-panel">
        <span className="music-marquee-container">
          <span className="music-marquee-content" data-playing={playing}>
            <span className="music-title">{title}</span>
            <span className="music-title" aria-hidden>
              {title}
            </span>
          </span>
        </span>

        <span className="music-wave" aria-hidden>
          {levels.map((h, i) => (
            <span key={i} className="music-bar" style={{ height: `${Math.round(h)}%` }} />
          ))}
        </span>

        <span className="music-progress" aria-hidden>
          <span className="music-progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </span>
      </span>

      <button
        type="button"
        className="music-play"
        onClick={toggle}
        aria-label={playing ? `Pause ${profile.nowPlaying.track}` : `Play ${profile.nowPlaying.track}`}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <Pause className="music-play-icon" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="music-play-icon" fill="currentColor" strokeWidth={0} />
        )}
      </button>

      {profile.nowPlaying.audio && (
        <audio
          ref={audioRef}
          src={profile.nowPlaying.audio}
          preload="none"
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setProgress(el.duration ? el.currentTime / el.duration : 0);
          }}
          onEnded={() => {
            setPlaying(false);
            setProgress(0);
          }}
          onPause={() => setPlaying(false)}
        />
      )}
    </Card>
  );
}
