"use client";

import { motion } from "framer-motion";

const HIGHLIGHTS = [
  { value: "100%", label: "Personalizado" },
  { value: "24h", label: "Entrega rápida" },
  { value: "∞", label: "Memórias eternas" },
];

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.02] py-10">
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-4">
        {HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-white md:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs tracking-widest uppercase text-white/35">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
