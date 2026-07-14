import { motion } from "motion/react";
import { Cpu, Layers, Terminal, Database, Code, ShieldCheck, Zap, Cloud } from "lucide-react";
import { TECH_ITEMS } from "../data";

export default function TechStack() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const categories = [
    {
      name: "ML/AI",
      icon: <Layers className="w-5 h-5" />,
      description: "Neural networks, hybrid retrieval, evaluation gates, and fine-tuning frameworks.",
    },
    {
      name: "MLOps",
      icon: <Cpu className="w-5 h-5" />,
      description: "Lifecycle tracking, version control, data validation, and deployment pipelines.",
    },
    {
      name: "Engineering",
      icon: <Database className="w-5 h-5" />,
      description: "Performant backends, transactional/caching databases, and core dev tooling.",
    },
    {
      name: "Deployment",
      icon: <Cloud className="w-5 h-5" />,
      description: "Cloud infrastructure provisioning, edge deployment runtimes, and scalable container environments.",
    },
    {
      name: "Foundations",
      icon: <Terminal className="w-5 h-5" />,
      description: "Mathematical modeling, statistical distributions, and structured algorithmic problem solving.",
    },
  ] as const;

  return (
    <section id="tech-stack" className="py-24 md:py-32 bg-brand-sec-bg px-6 md:px-12 relative border-t border-brand-border">
      {/* Decorative Blur background */}
      <div className="absolute top-[20%] left-[50%] w-[40%] h-[30%] rounded-full bg-brand-text blur-[150px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="mb-20 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
            03 / SYSTEMS SPECIFICATION
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text">
            Technical Superstructures
          </h2>
        </motion.div>

        {/* Categories Layout */}
        <div className="space-y-16">
          {categories.map((cat, catIdx) => {
            const items = TECH_ITEMS.filter((item) => item.category === cat.name);
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: catIdx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-brand-border pb-12 last:border-b-0 last:pb-0"
              >
                {/* Left Description Side */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3 text-brand-text">
                    <div className="p-2 rounded-lg border border-brand-border bg-brand-card">
                      {cat.icon}
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="font-sans text-brand-sec-text text-sm leading-relaxed max-w-sm">
                    {cat.description}
                  </p>
                </div>

                {/* Right Cards Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {items.map((item, itemIdx) => (
                    <motion.div
                      key={item.name}
                      whileHover={{
                        scale: 1.05,
                        rotate: itemIdx % 2 === 0 ? 1 : -1,
                        boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.05)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="p-5 rounded-2xl border border-brand-border bg-brand-card/30 hover:bg-brand-card/80 hover:border-brand-text/30 transition-colors duration-300 flex flex-col justify-between h-32 group cursor-pointer relative overflow-hidden"
                    >
                      {/* Subtle Glow on card hover */}
                      <div className="absolute inset-0 bg-radial from-brand-text/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Card Content */}
                      <div className="flex justify-between items-start">
                        <span className="font-display font-semibold text-brand-text text-base sm:text-lg leading-tight">
                          {item.name}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-brand-muted group-hover:text-brand-text transition-colors duration-300" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                          CORE FOCUS
                        </span>
                        <span className="text-xs font-sans text-brand-sec-text group-hover:text-brand-text transition-colors">
                          {item.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
