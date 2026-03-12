import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import PromiseSection from "@/components/PromiseSection";
import BrushStrokes from "@/components/BrushStrokes";

// Lazy load below-fold sections
const ProgramsSection = lazy(() => import("@/components/ProgramsSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const StudentResultsSection = lazy(() => import("@/components/StudentResultsSection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const ModulesSection = lazy(() => import("@/components/ModulesSection"));
const PricingCards = lazy(() => import("@/components/PricingCards"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const TeachersSection = lazy(() => import("@/components/TeachersSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const LeadFormSection = lazy(() => import("@/components/LeadFormSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px]" />}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      <BrushStrokes />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <PromiseSection />
      <LazySection><ProgramsSection /></LazySection>
      <LazySection><GallerySection /></LazySection>
      <LazySection><StudentResultsSection /></LazySection>
      <LazySection><ModulesSection /></LazySection>
      <LazySection><PricingCards /></LazySection>
      <LazySection><TeachersSection /></LazySection>
      <LazySection><TestimonialsSection /></LazySection>
      <LazySection><SuccessStoriesSection /></LazySection>
      <LazySection><NewsSection /></LazySection>
      <LazySection><FaqSection /></LazySection>
      <LazySection><LeadFormSection /></LazySection>
      <LazySection><CtaSection /></LazySection>
    </main>
  );
};

export default Index;
