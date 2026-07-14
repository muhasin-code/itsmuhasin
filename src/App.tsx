/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Lenis from "lenis";

// Import Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import GithubContributions from "./components/GithubContributions";
import Contact from "./components/Contact";
import StayConnected from "./components/StayConnected";
import Footer from "./components/Footer";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  // Theme Toggle States (Default to Dark Theme, matching dark-first guidelines)
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "light";
      return false; // Default to Dark first
    }
    return false;
  });

  // AI Twin Assistant Modal Drawer Toggle
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom premium cubic-bezier easeout
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Sync isLight state to document class
  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight((prev) => !prev);
  const openAiAssistant = () => setIsAiOpen(true);
  const closeAiAssistant = () => setIsAiOpen(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-300 relative select-text antialiased">
      {/* Floating Header */}
      <Header
        isLight={isLight}
        toggleTheme={toggleTheme}
        openAiAssistant={openAiAssistant}
      />

      {/* Main Single Page Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero openAiAssistant={openAiAssistant} />

        {/* Section 2: About / Philosophy */}
        <About />

        {/* Section 3: Featured Projects */}
        <Projects />

        {/* Section 4: Experience Trajectory */}
        <Experience />

        {/* Section 5: GitHub contribution feed */}
        <GithubContributions />

        {/* Section 6: Tech Stack specification */}
        <TechStack />

        {/* Section 7: Contact gateway */}
        <Contact />

        {/* Section 8: Stay Connected social links */}
        <StayConnected />
      </main>

      {/* Minimalist Footer */}
      <Footer />

      {/* Interactive AI Assistant Portal Panel */}
      <AiAssistant isOpen={isAiOpen} onClose={closeAiAssistant} />
    </div>
  );
}
