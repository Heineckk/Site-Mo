import type { Metadata } from "next";
import DemoVideo from "@/components/formulario/DemoVideo";
import FormHeader from "@/components/formulario/FormHeader";
import FormLandingHero from "@/components/formulario/FormLandingHero";
import HowItWorks from "@/components/formulario/HowItWorks";
import ModelSelection from "@/components/formulario/ModelSelection";
import TrustBar from "@/components/formulario/TrustBar";
import { FormCredit } from "@/components/formulario/FormUI";

export const metadata: Metadata = {
  title: "Presente Digital Personalizado | Dotti 303",
  description:
    "Crie um site exclusivo para surpreender quem você ama. Escolha entre Casal ou Carta, preencha o formulário e receba seu presente digital.",
};

export default function FormularioHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508]">
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
