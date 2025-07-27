"use client";

import { useRef, useEffect, useState } from "react";

import AiAssistantSection from "@/components/homepage/AiAssistantSection";
import AppPreview from "@/components/homepage/AppPreview";
import BenefitsSection from "@/components/homepage/BenefitsSection";
import CallToAction from "@/components/homepage/CallToAction";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import HeroSection from "@/components/homepage/HeroSection";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const appPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (appPreviewRef.current) {
      observer.observe(appPreviewRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <Header />

      <main className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <HeroSection />
          <FeaturesSection />
          <AppPreview ref={appPreviewRef} isVisible={isVisible} />
          <AiAssistantSection />
          <BenefitsSection />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
}
