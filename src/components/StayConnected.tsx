import { motion } from "motion/react";
import { Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { LINKEDIN_URL, EMAIL_ADDRESS } from "../data";

export default function StayConnected() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const platforms = [
    {
      name: "LinkedIn",
      value: "muhasin-code",
      href: LINKEDIN_URL,
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-[#0a66c2]",
      bgColor: "hover:bg-[#0a66c2]/5",
    },
    {
      name: "Instagram",
      value: "muhsin.offl",
      href: "https://instagram.com/muhsin.offl",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:text-[#e1306c]",
      bgColor: "hover:bg-[#e1306c]/5",
    },
    {
      name: "Direct Mail",
      value: EMAIL_ADDRESS,
      href: `mailto:${EMAIL_ADDRESS}`,
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-brand-text",
      bgColor: "hover:bg-brand-text/5",
    },
  ];

  return (
    <section id="stay-connected" className="py-24 md:py-32 bg-brand-sec-bg px-6 md:px-12 relative overflow-hidden border-t border-brand-border">
      {/* Decorative radial lighting background */}
      <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-brand-text blur-[160px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
              07 / NETWORKS & CHANNELS
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-brand-text mb-4">
              Stay Connected
            </h2>
            <p className="font-sans text-brand-sec-text text-sm sm:text-base leading-relaxed">
              Have a proposal, an algorithmic puzzle, or just want to network? Connect with me directly through any of these platforms.
            </p>
          </motion.div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: index * 0.1 }}
              className={`group p-6 rounded-2xl border border-brand-border bg-brand-card/20 hover:border-brand-text/35 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer relative overflow-hidden`}
            >
              {/* Decorative faint background pulse on hover */}
              <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${platform.bgColor}`} />

              <div className="flex items-start justify-between relative z-10">
                <span className={`p-3 rounded-xl border border-brand-border bg-brand-bg text-brand-muted group-hover:border-brand-text/30 transition-all duration-300 ${platform.color}`}>
                  {platform.icon}
                </span>
                <span className="text-brand-muted/40 group-hover:text-brand-text transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                  {platform.name}
                </span>
                <span className="text-sm font-sans font-medium text-brand-sec-text group-hover:text-brand-text transition-colors duration-300 block truncate">
                  {platform.value}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
