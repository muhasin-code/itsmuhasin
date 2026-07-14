import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "../data";

export default function Experience() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress logic for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll progression using spring dynamics
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section id="experience" className="py-24 md:py-32 bg-brand-bg px-6 md:px-12 relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="mb-20 md:mb-28 text-center md:text-left"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
            04 / HISTORIC SEQUENCE
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text">
            Professional Trajectory
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-12 md:mt-20">
          
          {/* Central Track Line (Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-border/30 -translate-x-1/2 pointer-events-none" />

          {/* Central Progress Line (Foreground) following scroll */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-text -translate-x-1/2 pointer-events-none"
          />

          {/* List of Entries */}
          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp) => {
              return (
                <div
                  key={exp.id}
                  className="relative flex flex-col md:flex-row items-stretch w-full"
                >
                  {/* central timeline node (glowing bullet) */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <motion.div
                      variants={nodeVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-8 h-8 rounded-full border-2 border-brand-border bg-brand-sec-bg flex items-center justify-center text-brand-text shadow-lg hover:border-brand-text transition-colors duration-300"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>

                  {/* Left Block: Role & Company Details (Consistent on Desktop Left) */}
                  <div className="hidden md:block w-1/2 pr-12 text-right">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
                      className="space-y-3"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border bg-brand-card/30 text-xs font-mono text-brand-muted">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </span>
                      <h3 className="font-display font-bold text-2xl text-brand-text">
                        {exp.role}
                      </h3>
                      <h4 className="font-sans font-semibold text-brand-sec-text text-base">
                        {exp.company}
                      </h4>
                    </motion.div>
                  </div>

                  {/* Right Block: Descriptions & Bullet Details Card (Consistent on Desktop Right) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 text-left">
                    
                    {/* On Mobile, render title above the card */}
                    <div className="md:hidden mb-4">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                        className="space-y-2"
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-border bg-brand-card/30 text-xs font-mono text-brand-muted">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </span>
                        <h3 className="font-display font-bold text-xl text-brand-text">
                          {exp.role}
                        </h3>
                        <h4 className="font-sans font-semibold text-brand-sec-text text-sm">
                          {exp.company}
                        </h4>
                      </motion.div>
                    </div>

                    {/* Timeline Main description details card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.2 }}
                      className="pointer-events-auto p-6 rounded-3xl border border-brand-border bg-brand-card/40 hover:bg-brand-card/80 transition-all duration-300 shadow-lg max-w-lg md:ml-0"
                    >
                      <ul className="space-y-4">
                        {exp.description.map((bullet, bulletIdx) => (
                          <li
                            key={bulletIdx}
                            className="flex items-start gap-3 text-sm font-sans text-brand-sec-text leading-relaxed"
                          >
                            <span className="mt-1 text-brand-muted shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-brand-text" />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Card Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-brand-border">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase border border-brand-border/40 bg-brand-bg text-brand-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
