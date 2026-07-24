import { BackToTop } from "@/components/BackToTop";
import { MobileTopBar } from "@/components/MobileTopBar";
import { StickyNav } from "@/components/StickyNav";
import { Etape } from "@/components/sections/Etape";
import { Fondatori } from "@/components/sections/Fondatori";
import { Footer } from "@/components/sections/Footer";
import { Formular } from "@/components/sections/Formular";
import { Hero } from "@/components/sections/Hero";
import { Misiune } from "@/components/sections/Misiune";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <Misiune />
        <Fondatori />
        <Etape />
        <Formular />
      </main>
      <Footer />
      <StickyNav />
      <MobileTopBar />
      <BackToTop />
    </>
  );
}
