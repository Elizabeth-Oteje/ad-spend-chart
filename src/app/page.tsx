"use client";

import { useEffect, useState } from "react";
import { fetchAdSpendData, AdSpendData } from "@/lib/data-service";
import AdSpendChart from "@/components/AdSpendChart";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<AdSpendData | null>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="relative min-h-screen overflow-hidden bg-[#020202] p-4 text-white selection:bg-brand-purple/30 md:p-12 lg:p-20">
      {/* Cinematic Scanline Reveal */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div className="animate-scanline h-40 w-full bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent shadow-[0_0_100px_rgba(139,92,246,0.3)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl space-y-20"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <header className="space-y-6">
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

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="max-w-2xl text-base font-medium leading-tight text-slate-400 md:text-xl"
          >
            Track your advertising spend across platforms with high-precision, Year-over-Year
            performance benchmarking and comparison tools.
          </motion.p>
        </header>

        <motion.section
          className="group relative"
          variants={{
            hidden: { opacity: 0, scale: 0.98 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
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
              data && <AdSpendChart data={data} />
            )}
          </AnimatePresence>
          <div className="absolute -inset-0.5 -z-10 rounded-[2.5rem] bg-brand-purple/20 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100" />
        </motion.section>
        <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-800/50 pt-12 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Marketing Intelligence Systems. All rights reserved.</p>
        </footer>
      </motion.div>
    </main>
  );
}
