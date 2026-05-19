"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LoveLetter() {
  const sectionRef = useRef<HTMLElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(letterRef.current, {
        scrollTrigger: {
          trigger: letterRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(heartRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -60,
        rotation: 10,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = [
    "Minha querida Ana Lívia,",
    "Escrevo estas palavras com o coração transbordando de amor por você. Você entrou na minha vida como a luz mais bonita que eu já vi, e desde então, nada mais é igual.",
    "Seu nome é a primeira coisa que penso ao acordar e a última antes de dormir. Você é minha paz nos dias turbulentos, minha alegria nos dias comuns e meu sonho nos dias quietos.",
    "Prometo estar ao seu lado em cada capítulo da nossa história — nos dias de sol e nos de chuva, nas risadas e nas lágrimas, na calma e na tempestade.",
    "Obrigado por ser exatamente quem você é. Obrigado por me escolher. Obrigado por existir.",
    "Para sempre seu, bbzudo",
  ];

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="section-padding relative z-10 overflow-hidden"
    >
      <div
        ref={heartRef}
        className="pointer-events-none absolute top-20 right-10 text-[200px] text-rose/5 select-none md:right-20"
      >
        ♥
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80">
            De coração para coração
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl">
            Carta de <span className="gradient-text italic">Amor</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </div>

        <div
          ref={letterRef}
          className="glass glow-rose relative rounded-3xl p-10 md:p-14"
        >
          <div className="absolute top-0 left-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-rose via-gold to-rose-light" />

          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`leading-relaxed ${
                  i === 0
                    ? "font-[family-name:var(--font-playfair)] text-2xl text-rose-light italic"
                    : i === paragraphs.length - 1
                      ? "font-[family-name:var(--font-playfair)] text-xl text-gold-light italic"
                      : "text-white/60"
                }`}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-4"
            >
              <p className="font-[family-name:var(--font-playfair)] text-3xl gradient-text md:text-4xl">
                Com todo meu amor ♥
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
