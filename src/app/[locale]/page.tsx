import { Navbar } from "@/components/ui/navigation";
import {
  HeroSection,
  SpecialtiesSection,
  FeaturedDoctorsSection,
  HowItWorksSection,
  DisclaimerSection,
  Footer,
} from "@/components/sections";
import { setRequestLocale } from "next-intl/server";

export default async function HomeLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering with next-intl
  setRequestLocale(locale);

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
