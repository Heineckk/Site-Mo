"use client";

import { motion } from "framer-motion";
import { useSite } from "@/contexts/SiteContext";

export default function Footer() {
  const { couple } = useSite();
  const lines = couple.toNameLines;
  const tagline = couple.footerTagline ?? "Para sempre & além";

  return (
    <footer className="relative z-10 border-t border-white/5 py-16">
      <motion.div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-white md:text-4xl">
            {lines.map((line, i) => (
              <span key={line}>
                {i > 0 && " "}
                {i === lines.length - 1 && lines.length > 1 ? (
                  <span className="gradient-text italic">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </p>
          <p className="mt-4 text-sm tracking-[0.3em] uppercase text-white/30">
            {tagline}
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-rose text-xl"
            >
              ♥
            </motion.span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
