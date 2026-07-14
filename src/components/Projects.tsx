import { motion } from "motion/react";
import { Github, ArrowUpRight, FolderGit2 } from "lucide-react";
import { PROJECTS } from "../data";

export default function Projects() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  return (
    <section id="projects" className="py-24 md:py-32 bg-brand-bg px-6 md:px-12 relative border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="mb-20 md:mb-28"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
            02 / SELECTED RESEARCH
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text">
            Featured Systems & Models
          </h2>
        </motion.div>

        {/* Alternate Projects List */}
        <div className="space-y-24 md:space-y-36">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE_SMOOTH }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Content Panel */}
                <div
                  className={`lg:col-span-5 space-y-6 flex flex-col justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Category Card Header */}
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md border border-brand-border bg-brand-card text-brand-text">
                      <FolderGit2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Sub */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-brand-text tracking-tight">
                      {project.title}
                    </h3>
                    <h4 className="font-sans font-medium text-brand-muted text-sm sm:text-base">
                      {project.subtitle}
                    </h4>
                  </div>

                  {/* Long Description */}
                  <p className="font-sans text-brand-sec-text text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[11px] font-mono rounded-md border border-brand-border bg-brand-card/30 text-brand-sec-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons (Live / GitHub) */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-full bg-brand-text text-brand-bg text-xs font-semibold hover:scale-[1.03] transition-all duration-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Interactive Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-card text-brand-text text-xs font-semibold hover:scale-[1.03] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  </div>
                </div>

                {/* Preview Image Card Panel */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="relative aspect-video rounded-3xl border border-brand-border bg-brand-card overflow-hidden shadow-2xl group cursor-pointer"
                  >
                    {/* Embedded preview Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient vignette over thumbnail */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
