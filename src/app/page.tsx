"use client";

import { useEffect, useState } from "react";
import { fetchAdSpendData, AdSpendData } from "@/lib/data-service";
import AdSpendChart from "@/components/AdSpendChart";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import InsightCard from "@/components/InsightCard";

export default function Home() {
  const [data, setData] = useState<AdSpendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchAdSpendData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#020202] text-white transition-all duration-1000 selection:bg-brand-purple/30 ${focusMode ? "p-0" : "p-4 md:p-12 lg:p-20"}`}
    >
      {/* Cinematic Scanline Reveal */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div className="animate-scanline h-40 w-full bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent opacity-50 shadow-[0_0_100px_rgba(139,92,246,0.3)]" />
      </div>

      {/* Focus Mode Backdrop */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`relative z-40 mx-auto space-y-12 transition-all duration-1000 ${focusMode ? "mt-4 max-w-[95vw]" : "max-w-6xl"}`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <header
          className={`flex flex-col gap-3 transition-all duration-500 md:flex-row md:items-end md:justify-between ${focusMode ? "h-0 overflow-hidden opacity-0" : "opacity-100"}`}
        >
          <div className="space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.3em] text-brand-purple-light"
            >
              <ShieldCheck size={14} className="animate-pulse" />
              Analytics Dashboard
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:mb-4 md:text-6xl">
                Every dollar{" "}
                <span className="bg-gradient-to-r from-brand-purple to-emerald-400 bg-clip-text text-transparent">
                  tells a story.
                </span>
              </h1>
              <p className="max-w-2xl text-base font-medium leading-tight text-slate-400 md:text-xl">
                High-precision performance benchmarking simulating Jan 2024 vs 2025.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFocusMode(true)}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-purple transition-colors group-hover:bg-emerald-400" />
              Enter Focus Mode
            </motion.button>
          </motion.div>
        </header>

        {/* Insight Cards Grid */}
        {!loading && !focusMode && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InsightCard
              title="Efficiency"
              value="+18%"
              trend="up"
              description="Cost per acquisition dropped significantly."
              delay={0.8}
            />
            <InsightCard
              title="Weakest Day"
              value="Tuesday"
              trend="down"
              description="Consistently lower engagement rates."
              delay={0.9}
            />
            <InsightCard
              title="Q1 Momentum"
              value="Strong"
              trend="up"
              description="Pacing 24% ahead of last year."
              delay={1.0}
            />
          </div>
        )}

        {/* Chart Section */}
        <motion.section
          key={focusMode ? "focused" : "normal"}
          layout
          className="group relative"
          variants={{
            hidden: { opacity: 0, scale: 0.98 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {focusMode && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setFocusMode(false)}
              className="absolute -top-12 right-0 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              Exit Focus
            </motion.button>
          )}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-[500px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] text-slate-500 backdrop-blur-3xl"
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-brand-purple/5 to-transparent" />
                <div className="h-16 w-16 animate-spin rounded-full border-2 border-brand-purple/30 border-t-brand-purple" />
                <div className="flex flex-col items-center gap-1">
                  <p className="animate-pulse text-xs font-black uppercase tracking-[0.4em] text-brand-purple/60">
                    Aggregrating Global Metrics
                  </p>
                  <p className="font-mono text-[10px] opacity-40">Syncing: 81% ...</p>
                </div>
              </motion.div>
            ) : (
              data && (
                <AdSpendChart
                  data={data}
                  isFocusMode={focusMode}
                  key={focusMode ? "chart-focus" : "chart-normal"}
                />
              )
            )}
          </AnimatePresence>
          <div className="absolute -inset-0.5 -z-10 rounded-[2.5rem] bg-brand-purple/20 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100" />
        </motion.section>

        <footer
          className={`flex flex-col items-center justify-between gap-6 border-t border-slate-800/50 pt-12 text-sm text-slate-500 transition-opacity duration-500 md:flex-row ${focusMode ? "opacity-0" : "opacity-100"}`}
        >
          <p>© 2026 Marketing Intelligence Systems. All rights reserved.</p>
        </footer>
      </motion.div>
    </main>
  );
}
