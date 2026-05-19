"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-[0.4em] uppercase text-gold/80"
          >
            Capítulo Um
          </motion.span>
          <h2
            ref={titleRef}
            className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-6xl"
          >
            Nossa <span className="gradient-text italic">História</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 shimmer-border" />
        </div>

        <div ref={textRef} className="space-y-8">
          <p className="text-center text-lg leading-relaxed text-white/60 md:text-xl">
            Antes de você, eu não sabia que o amor podia ser tão profundo e
            tão leve ao mesmo tempo. Você chegou como um sussurro suave e
            transformou tudo em poesia.
          </p>
          <p className="text-center text-lg leading-relaxed text-white/50 md:text-xl">
            Cada conversa nossa é um capítulo que eu quero reler para sempre.
            Cada risada sua ilumina dias inteiros. Cada olhar trocado me
            lembra que encontrei em você o meu lugar no mundo.
          </p>
          <p className="text-center text-lg leading-relaxed text-white/50 md:text-xl">
            Ana Lívia, você não é apenas minha namorada — você é meu
            presente, meu futuro e a razão pela qual eu acredito em
            milagres.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass glow-rose mx-auto mt-16 max-w-lg rounded-2xl p-8 text-center"
        >
          <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-rose-light md:text-3xl">
            &ldquo;Onde quer que você esteja, é onde eu quero estar.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
