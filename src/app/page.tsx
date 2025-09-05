import { Navbar } from "@/components/ui/navigation";
import {
  HeroSection,
  SpecialtiesSection,
  FeaturedDoctorsSection,
  HowItWorksSection,
  TestimonialsSection,
  Footer,
} from "@/components/sections";

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
