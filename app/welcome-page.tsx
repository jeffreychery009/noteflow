"use client";

import AiAssistantSection from "@/components/homepage/AiAssistantSection";
import AppPreview from "@/components/homepage/AppPreview";
import BenefitsSection from "@/components/homepage/BenefitsSection";
import CallToAction from "@/components/homepage/CallToAction";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import Footer from "@/components/homepage/footer";
import Header from "@/components/homepage/Header";
import HeroSection from "@/components/homepage/HeroSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <Header />

      <main className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <HeroSection />
          <FeaturesSection />
          <AppPreview />
          <AiAssistantSection />
          <BenefitsSection />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
}
