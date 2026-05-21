"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FormModelIcon } from "@/components/formulario/FormIcons";
import { FormPriceTag } from "@/components/formulario/FormUI";
import { PRICING } from "@/lib/pricing";

const MODELS = [
  {
    href: "/formulario/namoro",
    variant: "namoro" as const,
    title: "Casal",
    subtitle: "Declarações românticas",
    description:
      "História do casal, carta de amor, motivos especiais. Quiz e fotos são opcionais.",
    price: PRICING.casal,
    priceVariant: "rose" as const,
    ctaClass: "text-rose-light group-hover:text-rose",
    hoverClass:
      "hover:border-rose/30 hover:shadow-lg hover:shadow-rose/10",
  },
  {
    href: "/formulario/cartinha",
    variant: "cartinha" as const,
    title: "Carta",
    subtitle: "Para alguém especial",
    description:
      "Mensagem sincera para amigos ou alguém importante. Não precisa ser relacionamento.",
    price: PRICING.cartinha,
    priceVariant: "gold" as const,
    ctaClass: "text-gold-light group-hover:text-gold",
    hoverClass:
      "hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10",
  },
];

export default function ModelSelection() {
  return (
    <section id="escolher-modelo" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-[0.35em] uppercase text-rose-light/90">
            Escolha agora
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-light text-white md:text-5xl">
            Qual é o seu <span className="gradient-text italic">presente</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
            Selecione o modelo ideal, preencha o formulário e envie pelo
            WhatsApp. Simples assim.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {MODELS.map((model, i) => (
            <motion.div
              key={model.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={model.href}
                className={`glass group relative block overflow-hidden rounded-3xl p-8 text-left transition md:p-10 ${model.hoverClass}`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[0.03] blur-2xl transition group-hover:bg-white/[0.06]" />

                <div className="relative flex items-start justify-between gap-4">
                  <FormModelIcon variant={model.variant} />
                  <FormPriceTag
                    amount={model.price}
                    variant={model.priceVariant}
                  />
                </div>

                <p className="relative mt-6 text-xs font-medium tracking-[0.2em] uppercase text-white/35">
                  {model.subtitle}
                </p>
                <h3 className="relative mt-2 font-[family-name:var(--font-playfair)] text-3xl text-white md:text-4xl">
                  {model.title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-white/45 md:text-base">
                  {model.description}
                </p>

                <span
                  className={`relative mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase ${model.ctaClass}`}
                >
                  Abrir formulário
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
