import { About } from "@/components/ui/About";
import { Cta } from "@/components/ui/Cta";
import { FAQ } from "@/components/ui/FAQ";
import { Features } from "@/components/ui/Features";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Navbar } from "@/components/ui/Navbar";
import { Newsletter } from "@/components/ui/Newsletter";
import { Pricing } from "@/components/ui/Pricing";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Services } from "@/components/ui/Services";
import { Sponsors } from "@/components/ui/Sponsors";
import { Team } from "@/components/ui/Team";
import { Testimonials } from "@/components/ui/Testimonials";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default LandingPage;
