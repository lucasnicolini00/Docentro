import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import FeaturedDoctorsSection from "@/components/FeaturedDoctorsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <HeroSection />
      <SpecialtiesSection />
      <FeaturedDoctorsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
