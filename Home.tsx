/*
 * NESTLY AI Landing Page – Modern SaaS Design
 * Complete landing page with all sections
 */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureBanner from "@/components/FeatureBanner";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import ProductPreviewSection from "@/components/ProductPreviewSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTAFooter from "@/components/CTAFooter";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onWaitlistClick={() => setWaitlistOpen(true)} />
      <HeroSection onWaitlistClick={() => setWaitlistOpen(true)} />
      <FeatureBanner />
      <AIFeaturesSection />
      <ProductPreviewSection />
      <PricingSection />
      <TestimonialsSection />
      <CTAFooter onWaitlistClick={() => setWaitlistOpen(true)} />
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </div>
  );
}
