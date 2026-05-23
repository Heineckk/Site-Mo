import type { Metadata } from "next";
import DemoVideo from "@/components/formulario/DemoVideo";
import FormHeader from "@/components/formulario/FormHeader";
import FormLandingHero from "@/components/formulario/FormLandingHero";
import HowItWorks from "@/components/formulario/HowItWorks";
import ModelSelection from "@/components/formulario/ModelSelection";
import TrustBar from "@/components/formulario/TrustBar";
import { FormCredit } from "@/components/formulario/FormUI";

/** SEO — título e descrição que aparecem no Google / ao compartilhar o link */
export const metadata: Metadata = {
  title: "Presente Digital Personalizado | Dotti 303",
  description:
    "Crie um site exclusivo para surpreender quem você ama. Escolha entre Casal ou Carta, preencha o formulário e receba seu presente digital.",
};

/**
 * LANDING PAGE DO FORMULÁRIO (/formulario)
 *
 * Fluxo do visitante:
 * 1. Hero — apresentação + botões "Fazer pedido" / "Ver demonstração"
 * 2. TrustBar — destaques (personalizado, entrega rápida, etc.)
 * 3. DemoVideo — vídeo do presente pronto (só carrega ao clicar play)
 * 4. HowItWorks — passo a passo de como pedir
 * 5. ModelSelection — escolhe Casal ou Carta → vai para /formulario/namoro ou /cartinha
 * 6. FormCredit — rodapé com créditos da turma 303
 */
export default function FormularioHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508]">
      {/* Gradiente rosa fixo no fundo — efeito visual, não clicável */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,157,0.08)_0%,transparent_50%)]" />

      <FormHeader />
      <FormLandingHero />
      <TrustBar />
      <DemoVideo />
      <HowItWorks />
      <ModelSelection />

      <div className="relative mx-auto max-w-6xl px-4 pb-16">
        <FormCredit />
      </div>
    </div>
  );
}
