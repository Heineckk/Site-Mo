"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/video-demonstrativo.mp4";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!videoSrc || !shouldPlay) return;
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    if (video.readyState >= 2) {
      void play();
      return;
    }

    video.addEventListener("loadeddata", play, { once: true });
    video.load();

    return () => video.removeEventListener("loadeddata", play);
  }, [videoSrc, shouldPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!videoSrc) {
      setVideoSrc(VIDEO_SRC);
      setShouldPlay(true);
      return;
    }

    if (video.paused) {
      void video.play().then(() => setPlaying(true));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="demonstracao" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-[0.35em] uppercase text-gold-light/90">
            Veja na prática
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-light text-white md:text-5xl">
            Assista ao <span className="gradient-text italic">resultado</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            Veja como fica o presente digital personalizado — uma experiência
            única para surpreender quem você ama.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto mt-14 max-w-sm md:max-w-md"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-b from-rose/20 via-transparent to-gold/15 blur-3xl" />

          <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3 shadow-2xl shadow-black/40">
            <div className="absolute left-1/2 top-4 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/15" />

            <div className="relative overflow-hidden rounded-[2rem] bg-black">
              <video
                ref={videoRef}
                className="aspect-[9/16] w-full bg-black object-cover"
                playsInline
                preload="none"
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              >
                {videoSrc && <source src={videoSrc} type="video/mp4" />}
              </video>

              {!playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/20"
                  aria-label="Reproduzir vídeo demonstrativo"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-rose shadow-xl shadow-rose/30 transition hover:scale-105">
                    <svg
                      className="ml-1 h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs tracking-wide text-white/30">
            Toque para assistir · Demonstração real do presente
          </p>
        </motion.div>
      </div>
    </section>
  );
}
