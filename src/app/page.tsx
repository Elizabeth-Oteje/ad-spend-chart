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
    <main className="relative min-h-screen bg-[#020202] text-white p-4 md:p-12 lg:p-24 selection:bg-brand-purple/30 overflow-hidden">
      {/* Cinematic Scanline Reveal */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div className="h-40 w-full bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent animate-scanline shadow-[0_0_100px_rgba(139,92,246,0.3)]" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto space-y-20 relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* Header Section */}
        <header className="space-y-6">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="flex items-center gap-2 text-brand-purple-light font-bold tracking-[0.3em] uppercase text-[10px]"
          >
            <ShieldCheck size={14} className="animate-pulse" />
            Analytics Dashboard
          </motion.div>
          
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-4xl md:text-7xl font-black tracking-tighter italic leading-[0.9]"
          >
              Ad <span className="text-brand-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">X-RAY.</span>
          </motion.h1>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-slate-400 max-w-2xl text-base md:text-xl font-medium leading-tight"
          >
            Track your advertising spend across platforms with high-precision, 
            Year-over-Year performance benchmarking and comparison tools.
          </motion.p>
        </header>

       

        {/* Chart Section */}
        <motion.section 
          className="relative group"
          variants={{
            hidden: { opacity: 0, scale: 0.98 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[500px] w-full bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] flex items-center justify-center flex-col gap-6 text-slate-500 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/5 to-transparent animate-pulse" />
                <div className="w-16 h-16 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
                <div className="flex flex-col items-center gap-1">
                  <p className="font-black uppercase tracking-[0.4em] text-xs text-brand-purple/60 animate-pulse">Aggregrating Global Metrics</p>
                  <p className="text-[10px] font-mono opacity-40">Syncing: 81% ...</p>
                </div>
              </motion.div>
            ) : (
              data && <AdSpendChart data={data} />
            )}
          </AnimatePresence>
          
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-0.5 bg-brand-purple/20 rounded-[2.5rem] blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.section>


        {/* Footer info */}
        <footer className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© 2026 Marketing Intelligence Systems. All rights reserved.</p>
       
        </footer>
      </motion.div>
    </main>
  );
}
