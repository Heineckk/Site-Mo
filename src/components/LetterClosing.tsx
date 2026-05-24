"use client";

import { motion } from "framer-motion";
import { splitEmojis } from "@/lib/emoji-display";

type LetterClosingProps = {
  closing: string;
  signature?: string;
  delay?: number;
};

export default function LetterClosing({
  closing,
  signature,
  delay = 0,
}: LetterClosingProps) {
  const emojis = signature ? splitEmojis(signature) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="letter-closing mt-10 border-t border-white/[0.07] pt-10 md:mt-12 md:pt-12"
    >
      <div className="flex flex-col items-center text-center">
        <p className="font-[family-name:var(--font-playfair)] text-lg italic leading-relaxed text-white/70 md:text-xl">
          {closing}
        </p>

        {emojis.length > 0 && (
          <div className="mt-8 flex flex-col items-center gap-5 md:mt-9">
            <div className="flex items-center justify-center gap-4 md:gap-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/20 md:w-16" />
              <div className="letter-signature-mark flex items-center gap-3">
                {emojis.map((emoji, i) => (
                  <span
                    key={`${emoji}-${i}`}
                    className="hero-emoji hero-emoji-signature select-none text-[2rem] leading-none md:text-[2.5rem]"
                    role="img"
                    aria-label={emoji}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/20 md:w-16" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
