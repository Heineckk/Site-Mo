"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Photo } from "@/types/site-config";
import { useSite } from "@/contexts/SiteContext";
import PhotoCard from "@/components/PhotoCard";
import Lightbox from "@/components/Lightbox";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoGallery() {
  const site = useSite();
  const { gallery } = site;
  const photos = gallery.photos;

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
    [activePhoto, photos]
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

  if (photos.length === 0) {
    return null;
  }

  const featured = photos.find((p) => p.featured) ?? photos[0];
  const others = photos.filter((p) => p.src !== featured.src);
  const [second, third, fourth] = others;

  return (
    <section
      id="fotos"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-rose/8 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-16 text-center md:mb-20">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            {gallery.sectionLabel}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl lg:text-7xl">
            Galeria do{" "}
            <span className="gradient-text italic">{gallery.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/40">{gallery.subtitle}</p>
          <motion.div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </div>

        <div
          ref={gridRef}
          className={
            photos.length === 1
              ? "mx-auto max-w-2xl"
              : photos.length === 3
                ? "grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2 md:gap-6"
                : "grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
          }
        >
          {photos.length === 1 ? (
            <PhotoCard photo={featured} index={0} size="large" onOpen={openPhoto} />
          ) : photos.length === 3 && second && third ? (
            <>
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
                  photo={second}
                  index={1}
                  size="medium"
                  onOpen={openPhoto}
                />
              </div>

              <div className="md:col-span-5">
                <PhotoCard
                  photo={third}
                  index={2}
                  size="medium"
                  onOpen={openPhoto}
                />
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-7 md:row-span-2">
                <PhotoCard
                  photo={featured}
                  index={0}
                  size="large"
                  onOpen={openPhoto}
                />
              </div>

              {second && (
                <div className="md:col-span-5">
                  <PhotoCard
                    photo={second}
                    index={1}
                    size="medium"
                    onOpen={openPhoto}
                  />
                </div>
              )}

              {(third || fourth) && (
                <div className="grid grid-cols-2 gap-5 md:col-span-5 md:gap-6">
                  {third && (
                    <PhotoCard
                      photo={third}
                      index={2}
                      size="small"
                      onOpen={openPhoto}
                    />
                  )}
                  {fourth && (
                    <PhotoCard
                      photo={fourth}
                      index={3}
                      size="small"
                      onOpen={openPhoto}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {photos.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 md:mt-16"
          >
            {photos.map((photo) => (
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
        )}
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
