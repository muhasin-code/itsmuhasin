import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function Contact() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(data.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to submit message.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-bg px-6 md:px-12 relative border-t border-brand-border overflow-hidden">
      {/* Backlighting */}
      <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[30%] rounded-full bg-brand-text blur-[150px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Big Editorial Title Side */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            >
              <span className="text-[11px] font-mono tracking-widest uppercase text-brand-muted mb-3 block">
                06 / INQUIRY GATEWAY
              </span>
              <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-brand-text mb-6">
                Let's build the next paradigm.
              </h2>
              <p className="font-sans text-brand-sec-text text-base sm:text-lg leading-relaxed max-w-md">
                Whether you're looking to scale an LLM training run, redesign model alignment flows, consult on GPU compute architectures, or simply discuss AI system limitations—let's start the conversation.
              </p>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {success ? (
                // Success State Card
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  className="p-8 rounded-3xl border border-brand-border bg-brand-card/40 flex flex-col items-center text-center gap-6"
                >
                  <div className="p-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-brand-text">
                      Transmission Confirmed
                    </h3>
                    <p className="font-sans text-brand-sec-text max-w-md leading-relaxed text-sm sm:text-base">
                      {success}
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(null)}
                    className="px-6 py-2.5 rounded-full border border-brand-border bg-brand-card/60 hover:bg-brand-card text-xs font-semibold cursor-pointer transition-all"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                // Form State
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: EASE_SMOOTH }}
                  className="p-8 rounded-3xl border border-brand-border bg-brand-card/30 hover:bg-brand-card/50 transition-colors duration-300 space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={isLoading}
                        placeholder="Dr. David Hilbert"
                        className="w-full bg-brand-bg/50 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/50 focus:outline-hidden focus:border-brand-text transition-colors disabled:opacity-55"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                        Your Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={isLoading}
                        placeholder="david@hilbert-space.org"
                        className="w-full bg-brand-bg/50 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/50 focus:outline-hidden focus:border-brand-text transition-colors disabled:opacity-55"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                      Inquiry Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      disabled={isLoading}
                      placeholder="Advisory opportunity / Distributed Training Scaling"
                      className="w-full bg-brand-bg/50 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/50 focus:outline-hidden focus:border-brand-text transition-colors disabled:opacity-55"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-mono tracking-wider uppercase text-brand-muted block">
                      Inquiry Body *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      disabled={isLoading}
                      placeholder="Hi Muhasin, I'm looking to optimize our distributed training configurations..."
                      className="w-full bg-brand-bg/50 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/50 focus:outline-hidden focus:border-brand-text transition-colors resize-none disabled:opacity-55"
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  {/* Submit Button (Pill shaped) */}
                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3.5 rounded-full bg-brand-text text-brand-bg text-sm font-semibold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting weight configurations...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
