import Header from "./components/Header";
import HeroSection from "./sections/HeroSection";
import FeaturedProducts from "./sections/FeaturedProducts";
import FAQ from "./sections/FAQ";
import HighlightProducts from "./sections/HighlightProducts";
import CategoriesSections from "./sections/CategoriesSections";
import Footer from "./components/Footer";
import CTA from "./sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grow">
        <HeroSection />
        <CategoriesSections />
        <FeaturedProducts />
        <HighlightProducts />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
