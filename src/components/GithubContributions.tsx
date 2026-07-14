import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitPullRequest, GitFork, GitCommit, Sparkles } from "lucide-react";
import { GITHUB_USERNAME } from "../data";

// Generate fallback mock data for 53 weeks of contributions (371 days)
function generateFallbackData() {
  const data = [];
  const baseDate = new Date();
  baseDate.setFullYear(baseDate.getFullYear() - 1);

  for (let i = 0; i < 371; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);

    // Generate realistic looking clusters of contributions
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rand = Math.random();
    
    let level = 0; // 0: no contribs, 1: low, 2: mid, 3: high, 4: max
    if (isWeekend) {
      if (rand > 0.85) level = 1;
      else if (rand > 0.95) level = 2;
    } else {
      if (rand > 0.9) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.4) level = 2;
      else if (rand > 0.15) level = 1;
    }

    // Map level to concrete contributions count
    const countMap = [
      0, 
      Math.floor(Math.random() * 2) + 1, 
      Math.floor(Math.random() * 3) + 3, 
      Math.floor(Math.random() * 4) + 6, 
      Math.floor(Math.random() * 6) + 10
    ];
    const count = countMap[level];

    const dateStr = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    data.push({
      id: i,
      level,
      count,
      date: dateStr,
    });
  }
  return data;
}

export default function GithubContributions() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  const [gridData, setGridData] = useState<any[]>(() => generateFallbackData());

  // Automatically scroll horizontal contribution scroller to the far right (showing latest contributions first)
  useEffect(() => {
    const scrollToEnd = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
      }
    };

    scrollToEnd();

    const rafId = requestAnimationFrame(() => {
      scrollToEnd();
    });

    const timerId = setTimeout(scrollToEnd, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [gridData]);
  const [totalContributions, setTotalContributions] = useState<number>(() => {
    return generateFallbackData().reduce((sum, day) => sum + day.count, 0);
  });
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    async function fetchContributions() {
      try {
        const response = await fetch(`/api/github-contributions?username=${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error("Fetch failed");
        const resData = await response.json();
        if (resData.success && active) {
          const parsedDays = resData.days.map((day: any, i: number) => {
            // Append T00:00:00 to keep the date in local user timezone representation
            const d = new Date(day.date + "T00:00:00");
            const dateStr = d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            return {
              id: i,
              level: day.level,
              count: day.count,
              date: dateStr,
            };
          });
          setGridData(parsedDays);
          setTotalContributions(resData.total);
          setIsLive(true);
        }
      } catch (error) {
        console.warn("Could not load live GitHub contributions, using highly realistic simulation.", error);
      }
    }
    fetchContributions();
    return () => {
      active = false;
    };
  }, []);

  // Compute active days and active percentage dynamically from gridData
  const activeDaysStats = useMemo(() => {
    if (!gridData || gridData.length === 0) {
      return { count: 0, percentage: "0.0" };
    }
    const activeCount = gridData.filter(day => day.level > 0).length;
    const percentage = ((activeCount / gridData.length) * 100).toFixed(1);
    return { count: activeCount, percentage };
  }, [gridData]);

  // Color mappings for dark/light intensities
  const getColorClass = (level: number) => {
    // We will use standard color intensities styled via Tailwind
    // We target CSS custom variables or Tailwind emerald shades
    switch (level) {
      case 0:
        return "bg-brand-card/60 dark:bg-zinc-900 border border-brand-border/20";
      case 1:
        return "bg-emerald-950/40 dark:bg-emerald-950/40 border border-emerald-900/30 text-emerald-400";
      case 2:
        return "bg-emerald-800/40 dark:bg-emerald-900/50 border border-emerald-800/40 text-emerald-300";
      case 3:
        return "bg-emerald-600/60 dark:bg-emerald-700/60 border border-emerald-600/50 text-emerald-200";
      case 4:
        return "bg-emerald-400 dark:bg-emerald-400 border border-emerald-300 text-brand-bg";
      default:
        return "bg-brand-card";
    }
  };

  return (
    <section id="contributions" className="py-24 md:py-32 bg-brand-sec-bg px-6 md:px-12 relative border-t border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
            05 / RECENT COMMITS
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-text mb-2">
            GitHub Contributions
          </h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-muted hover:text-brand-text transition-colors duration-300"
          >
            <span>github.com/{GITHUB_USERNAME}</span>
          </a>
        </motion.div>

        {/* Dashboard Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Contribution Grid Panel */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
            className="lg:col-span-8 p-6 md:p-8 rounded-3xl border border-brand-border bg-brand-card/40 hover:bg-brand-card/60 transition-colors duration-300 flex flex-col gap-6 shadow-xl relative"
          >
            {/* Graph Header details */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`}></span>
                <span className="font-mono text-xs uppercase tracking-wider text-brand-sec-text">
                  {isLive ? "Live GitHub Activity Feed" : "Simulated Research Feed"}
                </span>
              </div>
              
              {/* Contributions Legend */}
              <div className="flex items-center gap-1 text-[10px] font-mono text-brand-muted">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-brand-card border border-brand-border/40" />
                <div className="w-3 h-3 rounded-sm bg-emerald-950/40 border border-emerald-900/30" />
                <div className="w-3 h-3 rounded-sm bg-emerald-800/40 border border-emerald-800/40" />
                <div className="w-3 h-3 rounded-sm bg-emerald-600/60 border border-emerald-600/50" />
                <div className="w-3 h-3 rounded-sm bg-emerald-400 border border-emerald-300" />
                <span>More</span>
              </div>
            </div>

            {/* Contribution Grid Scroller */}
            <div ref={scrollContainerRef} className="overflow-x-auto pb-4 no-scrollbar">
              <div className="flex flex-col gap-1 min-w-[640px]">
                {/* 7 Days columns x 53 Weeks rows nested layout */}
                <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                  {gridData.map((day) => (
                    <motion.div
                      key={day.id}
                      whileHover={{ scale: 1.25, zIndex: 10 }}
                      className={`w-3.5 h-3.5 rounded-[2px] transition-all duration-150 cursor-pointer ${getColorClass(
                        day.level
                      )}`}
                      onMouseEnter={() => setHoveredDay({ count: day.count, date: day.date })}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Tooltip status */}
            <div className="h-6 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                {hoveredDay ? (
                  <motion.div
                    key="tooltip-active"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs font-mono text-brand-text flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-text animate-pulse" />
                    <span>
                      <strong>{hoveredDay.count}</strong> commits/contributions on{" "}
                      <strong>{hoveredDay.date}</strong>
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tooltip-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="text-xs font-mono text-brand-muted"
                  >
                    Hover over any square grid node to inspect temporal metrics
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Metrics Statistics Side Panel */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
            {/* Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
              className="p-6 rounded-3xl border border-brand-border bg-brand-card/40 flex flex-col justify-between h-36 hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div className="flex justify-between items-start text-brand-muted">
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  ANNUAL COMMITS
                </span>
                <GitCommit className="w-4 h-4 text-brand-text" />
              </div>
              <div className="space-y-1">
                <span className="font-display font-bold text-3xl sm:text-4xl text-brand-text">
                  {totalContributions.toLocaleString()}
                </span>
                <span className="text-xs font-sans text-brand-muted block">
                  Iterative repository edits
                </span>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.2 }}
              className="p-6 rounded-3xl border border-brand-border bg-brand-card/40 flex flex-col justify-between h-36 hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div className="flex justify-between items-start text-brand-muted">
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  COMMIT FREQUENCY
                </span>
                <GitPullRequest className="w-4 h-4 text-brand-text" />
              </div>
              <div className="space-y-1">
                <span className="font-display font-bold text-3xl sm:text-4xl text-brand-text">
                  {activeDaysStats.percentage}%
                </span>
                <span className="text-xs font-sans text-brand-muted block">
                  {activeDaysStats.count} active coding days
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
