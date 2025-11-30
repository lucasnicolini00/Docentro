import { Navbar } from "@/components/ui/navigation";
import {
  HeroSection,
  SpecialtiesSection,
  FeaturedDoctorsSection,
  HowItWorksSection,
  DisclaimerSection,
  Footer,
} from "@/components/sections";

export default async function HomeLocalePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <HeroSection />
      <SpecialtiesSection />
      <FeaturedDoctorsSection />
      <HowItWorksSection />
      <DisclaimerSection />
      <Footer />
    </div>
  );
}
