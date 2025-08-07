import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import TechnicalFeatures from "@/components/TechnicalFeatures";
import OpenSourceCTA from "@/components/OpenSourceCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <TechnicalFeatures />
        <OpenSourceCTA />
      </main>
      <Footer />
    </>
  );
}
