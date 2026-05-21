import type { Metadata } from "next";
import Link from "next/link";
import { FormModelIcon } from "@/components/formulario/FormIcons";
import { FormCredit, FormPriceTag } from "@/components/formulario/FormUI";
import InstagramButton from "@/components/formulario/InstagramButton";
import { PRICING } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Formulário de pedido",
  description: "Envie as informações para personalizar o presente digital.",
};

export default function FormularioHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,157,0.12)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="text-xs font-medium tracking-[0.35em] uppercase text-rose-light/90">
          Pedido
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-light text-white md:text-5xl">
          Escolha o <span className="gradient-text italic">modelo</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/45">
          Preencha o formulário correspondente. Ao finalizar, envie o resumo
          pelo WhatsApp junto com as fotos, se houver.
        </p>

        <div className="mt-10 flex justify-center">
          <InstagramButton />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Link
            href="/formulario/namoro"
            className="glass group rounded-2xl p-8 text-left transition hover:border-rose/30 hover:shadow-lg hover:shadow-rose/10"
          >
            <div className="flex items-start justify-between gap-4">
              <FormModelIcon variant="namoro" />
              <FormPriceTag amount={PRICING.casal} variant="rose" />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl text-white">
              Casal
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              História, carta, motivos. Quiz e fotos são opcionais.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-rose-light group-hover:text-rose">
              Abrir formulário
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>

          <Link
            href="/formulario/cartinha"
            className="glass group rounded-2xl p-8 text-left transition hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10"
          >
            <div className="flex items-start justify-between gap-4">
              <FormModelIcon variant="cartinha" />
              <FormPriceTag amount={PRICING.cartinha} />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl text-white">
              Carta
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Mensagem para alguém especial. Não precisa ser relacionamento.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gold-light group-hover:text-gold">
              Abrir formulário
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        </div>
        <FormCredit showInstagram={false} />
      </div>
    </div>
  );
}
