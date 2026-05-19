"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/contexts/SiteContext";
import { validateQuizAnswer, quizStorageKey } from "@/lib/quiz-validation";

type QuizGateProps = {
  children: ReactNode;
};

export default function QuizGate({ children }: QuizGateProps) {
  const questions = useSite().quiz.questions;

  if (questions.length === 0) {
    return <>{children}</>;
  }

  return <QuizGateWithQuestions>{children}</QuizGateWithQuestions>;
}

function QuizGateWithQuestions({ children }: QuizGateProps) {
  const site = useSite();
  const questions = site.quiz.questions;
  const storageKey = quizStorageKey(site.slug);

  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const passed = sessionStorage.getItem(storageKey) === "true";
    setUnlocked(passed);
    setReady(true);
  }, [storageKey]);

  const current = questions[step];
  const progress = ((step + (showSuccess ? 1 : 0)) / questions.length) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!answer.trim()) {
      setError("Digite uma resposta para continuar.");
      return;
    }

    if (!validateQuizAnswer(answer, current.answer)) {
      setError("Hmm... não é essa. Tenta de novo, amor!");
      return;
    }

    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      setAnswer("");
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      sessionStorage.setItem(storageKey, "true");
      setUnlocked(true);
    }, 2200);
  };

  if (!ready) {
    return (
      <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050508]">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-8 w-8 rounded-full border-2 border-rose/30 border-t-rose"
        />
      </motion.div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  const gate = site.quizGate;

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#050508] p-4">
      <motion.div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,157,0.12)_0%,transparent_50%)]" />
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-rose/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg"
      >
        <motion.div className="mb-8 text-center">
          <span className="text-sm font-medium tracking-[0.4em] uppercase text-rose-light/80">
            {gate.eyebrow}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-light text-white md:text-4xl">
            Só quem <span className="gradient-text italic">{gate.titleLine1}</span>
            <br />
            {gate.titleLine2}
          </h1>
          <p className="mt-4 text-sm text-white/40">{gate.subtitle}</p>
        </motion.div>

        <motion.div className="mb-6 h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-rose via-gold to-rose-light"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass glow-rose rounded-3xl p-10 text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-5xl"
              >
                ♥
              </motion.span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl text-white md:text-3xl">
                {gate.successTitle}
              </h2>
              <p className="mt-2 text-white/50">{gate.successSubtitle}</p>
            </motion.div>
          ) : (
            <motion.form
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="glass glow-rose rounded-3xl p-8 md:p-10"
            >
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold/70">
                Pergunta {step + 1} de {questions.length}
              </span>

              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-xl leading-snug text-white md:text-2xl">
                {current.question}
              </h2>

              <motion.div
                animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="mt-6"
              >
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError("");
                  }}
                  autoFocus
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center text-lg text-white placeholder:text-white/25 transition-colors focus:border-rose/50 focus:outline-none focus:ring-2 focus:ring-rose/20"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-sm text-rose-light"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-rose to-rose-dark py-4 text-sm font-medium tracking-widest uppercase text-white transition-shadow hover:shadow-lg hover:shadow-rose/30"
              >
                {step < questions.length - 1 ? "Próxima" : "Entrar no presente"}
              </motion.button>

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep((s) => s - 1);
                    setAnswer("");
                    setError("");
                  }}
                  className="mt-4 w-full text-center text-xs tracking-widest uppercase text-white/30 transition-colors hover:text-white/50"
                >
                  Voltar
                </button>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-white/20">
          {gate.footerCredit}
        </p>
      </motion.div>
    </motion.div>
  );
}
