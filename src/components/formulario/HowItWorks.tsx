"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Escolha o modelo",
    description:
      "Selecione entre Casal ou Carta — cada opção é pensada para um tipo de declaração.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Modelo Casal",
    description:
      "Ideal para declarações românticas — história do casal, carta de amor e momentos especiais.",
    accent: "rose" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" d="M12 21c-4-2.5-7-6.2-7-10.5a4 4 0 0 1 7-2.2 4 4 0 0 1 7 2.2C19 14.8 16 18.5 12 21z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Modelo Carta",
    description:
      "Perfeito para amigos ou alguém especial — uma mensagem sincera sem precisar ser namoro.",
    accent: "gold" as const,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 5 8-5M4 7v10h16V7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Preencha o formulário",
    description:
      "Após selecionar o modelo, preencha o formulário com as informações do presente.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Envie pelo WhatsApp",
    description:
      "Ao finalizar, aparecerá um botão para entrar em contato conosco via WhatsApp com seu pedido.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Realize o pagamento",
    description:
      "Após enviar seu texto pelo WhatsApp, realize o pagamento para confirmar seu pedido.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Receba seu link",
    description:
      "Após o pagamento, você receberá o link do site personalizado para enviar à pessoa amada.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
] as const;

function accentStyles(accent?: "rose" | "gold") {
  if (accent === "rose") {
    return {
      card: "border-rose/20 bg-rose/[0.06]",
      icon: "border-rose/30 bg-rose/15 text-rose-light",
      number: "text-rose-light/60",
    };
  }
  if (accent === "gold") {
    return {
      card: "border-gold/20 bg-gold/[0.06]",
      icon: "border-gold/30 bg-gold/15 text-gold-light",
      number: "text-gold-light/60",
    };
  }
  return {
    card: "border-white/[0.06] bg-white/[0.02]",
    icon: "border-white/10 bg-white/[0.06] text-white/70",
    number: "text-white/25",
  };
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
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
            Passo a passo
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-light text-white md:text-5xl">
            Como <span className="gradient-text italic">funciona</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
            Tudo simples, rápido e feito com carinho pela turma 303 do Dotti.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const styles = accentStyles(
              "accent" in step ? step.accent : undefined,
            );

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative rounded-2xl border p-6 transition hover:border-white/15 ${styles.card}`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`font-[family-name:var(--font-playfair)] text-2xl font-light ${styles.number}`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles.icon}`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
