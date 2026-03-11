import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import PromiseSection from "@/components/PromiseSection";
import ProgramsSection from "@/components/ProgramsSection";
import GallerySection from "@/components/GallerySection";
import StudentResultsSection from "@/components/StudentResultsSection";
import NewsSection from "@/components/NewsSection";
import ModulesSection from "@/components/ModulesSection";
import PricingCards from "@/components/PricingCards";
import TestimonialsSection from "@/components/TestimonialsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import FaqSection from "@/components/FaqSection";
import LeadFormSection from "@/components/LeadFormSection";
import CtaSection from "@/components/CtaSection";
import BrushStrokes from "@/components/BrushStrokes";

const Index = () => {
  return (
    <main className="relative">
      <BrushStrokes />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <PromiseSection />
      <ProgramsSection />
      <GallerySection />
      <StudentResultsSection />
      <ModulesSection />
      <PricingCards />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <NewsSection />
      <FaqSection />
      <LeadFormSection />
      <CtaSection />
    </main>
  );
};

export default Index;
