"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import InstagramButton from "@/components/formulario/InstagramButton";

export function FormPageShell({
  children,
  badge,
  title,
  subtitle,
}: {
  children: ReactNode;
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div className="relative min-h-screen overflow-hidden bg-[#050508] px-4 py-12 md:py-16">
      <motion.div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,157,0.14)_0%,transparent_55%)]" />
      <motion.div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <motion.div className="relative mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <span className="text-xs font-medium tracking-[0.35em] uppercase text-rose-light/90">
            {badge}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-light text-white md:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/45">
            {subtitle}
          </p>
        </header>
        {children}
        <FormCredit />
      </motion.div>
    </motion.div>
  );
}

export function FormCredit({ showInstagram = true }: { showInstagram?: boolean }) {
  return (
    <footer className="mt-12 border-t border-white/5 pt-8">
      <p className="text-center text-xs tracking-wide text-white/25">
        Feito pela turma do 303 do Dotti
      </p>
      {showInstagram && <InstagramButton className="mt-6" />}
    </footer>
  );
}

export function FormCard({
  children,
  title,
  step,
  hint,
}: {
  children: ReactNode;
  title: string;
  step?: number;
  hint?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass glow-rose mb-6 rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6 flex items-start gap-4">
        {step != null && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose/30 to-gold/20 text-sm font-medium text-white">
            {step}
          </span>
        )}
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white md:text-2xl">
            {title}
          </h2>
          {hint && (
            <p className="mt-1 text-sm text-white/40">{hint}</p>
          )}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </motion.section>
  );
}

export function FormLabel({
  children,
  htmlFor,
  optional,
}: {
  children: ReactNode;
  htmlFor?: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium tracking-widest uppercase text-white/50"
    >
      {children}
      {optional && (
        <span className="ml-2 font-normal normal-case tracking-normal text-white/30">
          opcional
        </span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 transition-colors focus:border-rose/50 focus:outline-none focus:ring-2 focus:ring-rose/20";

export function FormInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function FormTextarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} resize-y min-h-[100px]`}
    />
  );
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition-all ${
        checked
          ? "border-rose/40 bg-rose/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-white/40">{description}</span>
        )}
      </span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-rose" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

export function WriterChoice({
  value,
  onChange,
}: {
  value: "cliente" | "nos";
  onChange: (v: "cliente" | "nos") => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(
        [
          {
            id: "nos" as const,
            title: "Textos feitos por nós",
            desc: "Você informa o essencial; nós escrevemos tudo",
          },
          {
            id: "cliente" as const,
            title: "Eu escrevo meu texto",
            desc: "Você envia história, carta e demais textos prontos",
          },
        ] as const
      ).map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`rounded-xl border p-4 text-left transition-all ${
            value === opt.id
              ? "border-gold/50 bg-gold/10 ring-1 ring-gold/30"
              : "border-white/10 bg-white/[0.02] hover:border-white/20"
          }`}
        >
          <span className="block font-[family-name:var(--font-playfair)] text-lg text-white">
            {opt.title}
          </span>
          <span className="mt-1 block text-xs text-white/45">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}

export function SubmitBar({
  onSubmit,
  submitLabel = "Finalizar e gerar resumo",
}: {
  onSubmit: () => void;
  submitLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky bottom-4 z-10"
    >
      <button
        type="button"
        onClick={onSubmit}
        className="w-full rounded-full bg-gradient-to-r from-rose to-rose-dark py-4 text-sm font-medium tracking-widest uppercase text-white shadow-lg shadow-rose/25 transition hover:shadow-rose/40"
      >
        {submitLabel}
      </button>
    </motion.div>
  );
}

export function ResultModal({
  open,
  text,
  onClose,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
}) {
  if (!open) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="glass glow-rose max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
      >
        <motion.div className="border-b border-white/10 p-6">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
            Resumo do pedido
          </h3>
          <p className="mt-2 text-sm text-white/45">
            Copie o texto abaixo e envie pelo WhatsApp. Fotos, se houver, mande
            em mensagem separada.
          </p>
        </motion.div>
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap p-6 text-sm leading-relaxed text-white/70">
          {text}
        </pre>
        <motion.div className="flex flex-col gap-2 border-t border-white/10 p-4 sm:flex-row">
          <button
            type="button"
            onClick={copy}
            className="flex-1 rounded-full bg-gradient-to-r from-rose to-rose-dark py-3 text-sm font-medium tracking-wider uppercase text-white"
          >
            Copiar texto
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-white/15 py-3 text-sm text-white/60 hover:text-white"
          >
            Fechar
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
