"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Photo } from "@/data/photos";

type PhotoCardProps = {
  photo: Photo;
  index: number;
  className?: string;
  onOpen: (photo: Photo) => void;
  size?: "large" | "medium" | "small";
};

export default function PhotoCard({
  photo,
  index,
  className = "",
  onOpen,
  size = "medium",
}: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const heights = {
    large: "h-[480px] sm:h-[560px] md:h-[640px]",
    medium: "h-[380px] md:h-[440px]",
    small: "h-[280px] sm:h-[320px] md:h-[360px]",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(photo)}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className={`photo-card relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#0c0c14] transition-shadow duration-500 hover:shadow-2xl hover:shadow-rose/20 ${heights[size]}`}
      >
        <motion.div className="absolute inset-0 z-0 overflow-hidden">
          {imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              unoptimized
              sizes={
                size === "large"
                  ? "(max-width: 768px) 100vw, 60vw"
                  : size === "small"
                    ? "(max-width: 768px) 50vw, 25vw"
                    : "(max-width: 768px) 100vw, 40vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={photo.featured}
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 55%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[2] rounded-2xl border border-white/0 transition-colors duration-500 group-hover:border-rose/30" />
      </motion.div>
    </motion.article>
  );
}
