import { motion } from "motion/react";
import { Brain, Award, Star, Globe } from "lucide-react";
import { PORTRAIT_IMAGE, STATS } from "../data";

export default function About() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const corePhilosophy = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Cost-Aware MLOps",
      description: "Designing memory-efficient, resource-conscious pipeline schemas on modest local CPU environments while offloading intensive training to cloud infrastructure.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Math Foundations",
      description: "Using linear algebra, calculus, and statistics to truly understand the machinery of learning, enabling precise engineering and model reasoning.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-brand-sec-bg px-6 md:px-12 relative overflow-hidden border-t border-brand-border">
      {/* Centered Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
            01 / PHILOSOPHY
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text">
            Disciplined Constraints, Scaled Impact
          </h2>
        </motion.div>

        {/* Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Large portrait image (left side/centered on lg) - modified to soft rounded square to prevent clipping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 border border-brand-border bg-brand-card/20 group">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-brand-border/60">
                <img
                  src={PORTRAIT_IMAGE}
                  alt="Muhasin Portrait"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Outer decorative details */}
              <div className="absolute inset-0 border border-dashed border-brand-text/10 rounded-full scale-105 pointer-events-none group-hover:rotate-6 transition-transform duration-1000" />
            </div>
          </motion.div>

          {/* Short introduction + Core Philosophy Cards (right side) */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-display font-semibold text-2xl text-brand-text">
                "I design and build production-grade intelligent systems."
              </h3>
              <p className="font-sans text-brand-sec-text leading-relaxed text-base sm:text-lg">
                I am Muhammed Muhasin, the ML engineer dedicated to building robust RAG platforms and end-to-end MLOps lifecycles. Currently, I serve as ML Engineer at EduBerg Learning Hub, architecting conversational agents and production pipeline schemas while mentoring 150+ students.
              </p>
              <p className="font-sans text-brand-sec-text leading-relaxed text-sm sm:text-base">
                Constraint, I've found, is where the real engineering begins. My primary machine is a modest CPU-only Dell Latitude — no GPU to lean on, no brute-force shortcuts available. So intensive training runs get offloaded to the cloud, while the harder problem stays local: how do you reason about models, memory, and computation when you can't just throw hardware at it? That question has pulled me deep into the mathematics underneath machine learning — linear algebra, calculus, statistics — not as prerequisites to check off, but as a way of seeing the machinery clearly. And it hasn't stopped there. I follow the wider architecture of AI itself: how systems are trained, aligned, retrieved from, reasoned through, deployed. The limitation, it turns out, was never really a limitation. It was an invitation to understand things properly.
              </p>
            </motion.div>

            {/* Sub-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {corePhilosophy.map((phil, idx) => (
                <motion.div
                  key={phil.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.2 + idx * 0.1 }}
                  className="p-6 rounded-2xl border border-brand-border bg-brand-card/40 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300"
                >
                  <div className="p-3 rounded-xl border border-brand-border bg-brand-bg w-fit text-brand-text">
                    {phil.icon}
                  </div>
                  <h4 className="font-display font-semibold text-brand-text text-lg">
                    {phil.title}
                  </h4>
                  <p className="font-sans text-brand-sec-text text-sm leading-relaxed">
                    {phil.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Statistics Bar (Grid) */}
        <div className="w-full mt-24 md:mt-32 pt-12 border-t border-brand-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: idx * 0.1 }}
                className="text-center flex flex-col items-center gap-1.5"
              >
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-text tracking-tight flex items-center justify-center gap-0.5">
                  <span>{stat.value}</span>
                  <span className="text-brand-muted">{stat.suffix}</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-brand-sec-text text-center">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
