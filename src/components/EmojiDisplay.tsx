"use client";

import { motion } from "framer-motion";
import { splitEmojis } from "@/lib/emoji-display";

type EmojiDisplayProps = {
  text: string;
  delay?: number;
};

export default function EmojiDisplay({
  text,
  delay = 0,
}: EmojiDisplayProps) {
  const emojis = splitEmojis(text);

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-center gap-5 md:gap-7">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20 md:w-20" />
        <div className="flex items-center gap-4 md:gap-5">
          {emojis.map((emoji, i) => (
            <motion.span
              key={`${emoji}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: delay + i * 0.1,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero-emoji select-none text-[2.75rem] leading-none md:text-[3.25rem]"
              role="img"
              aria-label={emoji}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20 md:w-20" />
      </div>
      <div className="mx-auto mt-8 h-px w-16 shimmer-border opacity-70" />
    </div>
  );
}
