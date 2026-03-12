import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrushCursor from "@/components/BrushCursor";
import CampaignBanner from "@/components/CampaignBanner";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import LiveViewerBadge from "@/components/LiveViewerBadge";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import ProgramPage from "./pages/ProgramPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import GoPage from "./pages/GoPage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResultsPage from "./pages/ResultsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import StoriesPage from "./pages/StoriesPage";
import TeachersPage from "./pages/TeachersPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/program" element={<PageTransition><ProgramPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/go" element={<PageTransition><GoPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
        <Route path="/results" element={<PageTransition><ResultsPage /></PageTransition>} />
        <Route path="/news/:id" element={<PageTransition><NewsDetailPage /></PageTransition>} />
        <Route path="/stories" element={<PageTransition><StoriesPage /></PageTransition>} />
        <Route path="/teachers" element={<PageTransition><TeachersPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrushCursor />
      <Sonner />
      <BrowserRouter>
        <ScrollProgressBar />
        <CampaignBanner />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <LiveViewerBadge />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
