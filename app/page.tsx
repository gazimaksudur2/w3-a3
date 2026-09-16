import HeroSection from "./sections/HeroSection";
import FeaturedProducts from "./sections/FeaturedProducts";
import FAQ from "./sections/FAQ";
import HighlightProducts from "./sections/HighlightProducts";
import CategoriesSections from "./sections/CategoriesSections";
import CTA from "./sections/CTA";

export default function Home() {
  return (
    <>
      <main className="grow">
        <HeroSection />
        <CategoriesSections />
        <FeaturedProducts />
        <HighlightProducts />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
