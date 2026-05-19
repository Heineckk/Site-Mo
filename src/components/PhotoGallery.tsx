"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "@/data/photos";
import type { Photo } from "@/data/photos";
import PhotoCard from "@/components/PhotoCard";
import Lightbox from "@/components/Lightbox";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  const openPhoto = useCallback((photo: Photo) => setActivePhoto(photo), []);
  const closePhoto = useCallback(() => setActivePhoto(null), []);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (!activePhoto) return;
      const currentIndex = photos.findIndex((p) => p.src === activePhoto.src);
      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % photos.length
          : (currentIndex - 1 + photos.length) % photos.length;
      setActivePhoto(photos[nextIndex]);
    },
    [activePhoto]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(gridRef.current, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featured, bouquet, cafe, night] = [
    photos[0],
    photos[1],
    photos[2],
    photos[3],
  ];

  return (
    <section
      id="fotos"
      ref={sectionRef}
      className="section-padding relative z-20 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-rose/8 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute top-1/3 left-10 text-6xl text-rose/5 select-none"
        animate={{ rotate: [0, 10, 0], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        ♥
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-16 bottom-1/4 text-4xl text-gold/10 select-none"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        ✦
      </motion.div>

      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-px w-[80%] max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-rose/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-px w-[80%] max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          className="mb-16 text-center md:mb-20"
        >
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            Nossos Momentos
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl lg:text-7xl">
            Galeria do <span className="gradient-text italic">Nosso Amor</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/40">
            Clique em qualquer foto para ver em tela cheia.
          </p>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7 md:row-span-2">
            <PhotoCard
              photo={featured}
              index={0}
              size="large"
              onOpen={openPhoto}
            />
          </div>

          <div className="md:col-span-5">
            <PhotoCard
              photo={bouquet}
              index={1}
              size="medium"
              onOpen={openPhoto}
            />
          </div>

          <motion.div
            className="grid grid-cols-2 gap-5 md:col-span-5 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <PhotoCard
              photo={cafe}
              index={2}
              size="small"
              onOpen={openPhoto}
            />
            <PhotoCard
              photo={night}
              index={3}
              size="small"
              onOpen={openPhoto}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 md:mt-16"
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openPhoto(photo)}
              className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all duration-300 md:h-20 md:w-20 ${
                activePhoto?.src === photo.src
                  ? "border-rose shadow-lg shadow-rose/30"
                  : "border-white/10 opacity-60 hover:border-rose/40 hover:opacity-100"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.button>
          ))}
        </motion.div>

      </div>

      <Lightbox
        photo={activePhoto}
        onClose={closePhoto}
        onPrev={() => navigate("prev")}
        onNext={() => navigate("next")}
      />
    </section>
  );
}
