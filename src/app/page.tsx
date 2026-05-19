"use client";

import dynamic from "next/dynamic";
import QuizGate from "@/components/QuizGate";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import QualitiesSection from "@/components/QualitiesSection";
import PhotoGallery from "@/components/PhotoGallery";
import LoveLetter from "@/components/LoveLetter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#050508]" />
  ),
});

export default function Home() {
  return (
    <QuizGate>
      <ScrollProgress />
      <Scene3D />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <StorySection />
        <QualitiesSection />
        <PhotoGallery />
        <LoveLetter />
        <Footer />
      </main>
    </QuizGate>
  );
}
