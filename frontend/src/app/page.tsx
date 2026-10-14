import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyChoose } from "@/components/sections/why-choose";
import { Statistics } from "@/components/sections/statistics";
import { Departments } from "@/components/sections/departments";
import { DoctorsPreview } from "@/components/sections/doctors-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Emergency } from "@/components/sections/emergency";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <Statistics />
        <Departments />
        <DoctorsPreview />
        <HowItWorks />
        <Testimonials />
        <Emergency />
      </main>
      <Footer />
    </div>
  );
}