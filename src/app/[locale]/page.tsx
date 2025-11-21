import { Navbar } from "@/components/ui/navigation";
import {
  HeroSection,
  SpecialtiesSection,
  FeaturedDoctorsSection,
  HowItWorksSection,
  DisclaimerSection,
  Footer,
} from "@/components/sections";

export default async function HomeLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <HeroSection />
      <SpecialtiesSection locale={locale} />
      <FeaturedDoctorsSection locale={locale} />
      <HowItWorksSection locale={locale} />
      <DisclaimerSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
