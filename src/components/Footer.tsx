"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-white md:text-4xl">
            Ana <span className="gradient-text italic">Lívia</span>
          </p>
          <p className="mt-4 text-sm tracking-[0.3em] uppercase text-white/30">
            Para sempre &amp; além
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
      </div>
    </footer>
  );
}
