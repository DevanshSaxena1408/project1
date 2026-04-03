"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/effects/LoadingScreen";
import IntroSequence from "@/components/effects/IntroSequence";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import AstronautChat from "@/components/ui/AstronautChat";
import ScrollPage from "@/components/sections/ScrollPage";
import ParticleTrail from "@/components/effects/ParticleTrail";
import EasterEggs from "@/components/effects/EasterEggs";

const SpaceScene = dynamic(() => import("@/components/three/SpaceScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <CustomCursor />
      <ParticleTrail />
      <LoadingScreen />
      <SpaceScene />
      <IntroSequence />
      <Navbar />
      <ScrollPage />
      <AstronautChat />
      <EasterEggs />
    </main>
  );
}
