import { motion } from "motion/react";
import { ArrowDown, Sparkles, Code, Brain } from "lucide-react";
import { PORTRAIT_IMAGE, RESUME_URL } from "../data";

interface HeroProps {
  openAiAssistant: () => void;
}

export default function Hero({ openAiAssistant }: HeroProps) {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-brand-bg px-6 md:px-12 pt-24 md:pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-text blur-[150px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-text blur-[150px] opacity-10" />
      </motion.div>

      <div className="z-10 mb-6 flex flex-wrap justify-center gap-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.4 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border bg-brand-card/40 backdrop-blur-xs text-[11px] font-mono tracking-wider uppercase text-brand-sec-text"
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Focus: RAG & MLOps</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.5 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border bg-brand-card/40 backdrop-blur-xs text-[11px] font-mono tracking-wider uppercase text-brand-sec-text"
        >
          <Code className="w-3.5 h-3.5" />
          <span>ML Engineer</span>
        </motion.div>
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="overflow-hidden mb-1 sm:mb-2">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.6 }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] text-brand-text"
          >
            I turn
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-1 sm:mb-2 flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 py-1">
          <motion.span
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.65 }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] text-brand-text"
          >
            your
          </motion.span>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.8 }}
            className="w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border border-brand-border overflow-hidden inline-flex self-baseline relative select-none transform hover:scale-[1.05] transition-transform duration-300 shadow-md group cursor-pointer"
            onClick={openAiAssistant}
            aria-label="Talk to Muhasin's AI twin"
          >
            <img
              src={PORTRAIT_IMAGE}
              alt="Muhasin Portrait"
              className="w-full h-full object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-text/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <motion.span
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.7 }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] text-brand-text"
          >
            data
          </motion.span>
        </div>

        <div className="overflow-hidden mb-6 sm:mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.8 }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] text-brand-text"
          >
            into intelligent systems.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_SMOOTH, delay: 1 }}
          className="text-base sm:text-lg md:text-xl font-sans text-brand-sec-text max-w-3xl leading-relaxed mb-10 text-center"
        >
          Building production-grade RAG platforms and MLOps pipelines — from data to deployment, engineered for real-world constraints.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4 z-10">
          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 1.1 }}
            href="#projects"
            className="px-6 py-3 rounded-full bg-brand-text text-brand-bg font-semibold text-sm hover:scale-[1.03] transition-all duration-300 shadow-lg flex items-center gap-1 cursor-pointer"
          >
            <span>View Projects</span>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 1.2 }}
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-brand-border bg-brand-card/40 text-brand-text font-semibold text-sm hover:bg-brand-card transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <span>Download Resume</span>
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 1.5 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="p-1.5 rounded-full border border-brand-border text-brand-muted group-hover:text-brand-text transition-colors duration-300"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}