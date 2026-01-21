"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { AdSpendData } from "@/lib/data-service";
import { Activity } from "lucide-react";
import CountUp from "./CountUp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AdSpendChartProps {
  data: AdSpendData;
}

const AdSpendChart: React.FC<AdSpendChartProps> = ({ data }) => {
  const chartRef = useRef<any>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const chartData: ChartData<"line"> = {
    labels: data.data.map((d) => d.date),
    datasets: [
      {
        label: "2025 Spend",
        data: data.data.map((d) => d["2025"]),
        borderColor: "#8B5CF6", 
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#8B5CF6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "2024 Spend",
        data: data.data.map((d) => d["2024"]),
        borderColor: "#2DD4BF", 
        borderDash: [5, 5],
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#2DD4BF",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end",
        labels: {
          color: "#94A3B8",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "Inter",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleFont: {
          family: "Inter",
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "Inter",
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: {
            family: "Inter",
            size: 11,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#64748B",
          font: {
            family: "Inter",
            size: 11,
          },
          callback: (value) => `$${value}`,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group"
    >
      {/* Background Breath Effect */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute -inset-2 bg-brand-purple/5 blur-3xl -z-10 rounded-[2.5rem]" 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-purple/10 rounded-xl">
              <Activity className="text-brand-purple" size={20} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Ad Spend Performance
            </h2>
          </div>
          <p className="text-slate-400 text-xs md:text-sm">
            Simulated intelligence for Jan 2024 vs Jan 2025
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1">
              Avg. Daily Spend
            </p>
            <p className="text-xl md:text-2xl font-black text-white tabular-nums">
              <CountUp to={524.50} prefix="$" decimals={2} />
            </p>
          </div>
          <div className="w-px h-12 bg-white/5 hidden md:block" />
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1">
              Growth
            </p>
            <p className="text-xl md:text-2xl font-black text-emerald-400 tabular-nums">
              <CountUp to={24.8} suffix="%" decimals={1} />
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants} 
        className="h-[450px] w-full bg-slate-950/20 rounded-2xl p-4 border border-white/[0.03]"
      >
        <Line 
          ref={chartRef} 
          data={chartData} 
          options={{
            ...options,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart'
            }
          }} 
        />
      </motion.div>
    </motion.div>
  );
};

export default AdSpendChart;
