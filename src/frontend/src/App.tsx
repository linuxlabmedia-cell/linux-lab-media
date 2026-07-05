import ChatWidget from "@/components/ChatWidget";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AutomationSection from "@/components/sections/AutomationSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustSection from "@/components/sections/TrustSection";
import WebsiteDevSection from "@/components/sections/WebsiteDevSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import AdminPortalPage from "@/pages/AdminPortalPage";
import ClientPortalPage from "@/pages/ClientPortalPage";
import TeamChatPage from "@/pages/TeamChatPage";
import BusinessGrowthPage from "./pages/BusinessGrowthPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import GetStartedPage from "./pages/GetStartedPage";
import ServiceAreasPage from "./pages/ServiceAreasPage";
import ServicesPage from "./pages/ServicesPage";
import ThankYouPage from "./pages/ThankYouPage";

function MainSite() {
  return (
    <div style={{ backgroundColor: "#0A0A0A" }} className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <WebsiteDevSection />
        <SocialMediaSection />
        <AutomationSection />
        <ProcessSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FinalCTASection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (path === "/portal") return <ClientPortalPage />;
  if (path === "/admin-portal") return <AdminPortalPage />;
  if (path === "/team-chat") return <TeamChatPage />;
  if (path === "/faq") return <FAQPage />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/service-areas") return <ServiceAreasPage />;
  if (path === "/business-growth") return <BusinessGrowthPage />;
  if (path === "/get-started") return <GetStartedPage />;
  if (path === "/thank-you") return <ThankYouPage />;

  return <MainSite />;
}
