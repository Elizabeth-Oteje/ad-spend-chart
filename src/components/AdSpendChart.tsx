"use client";

import React, { useRef, useState, useMemo } from "react";
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
  Filler,
);

interface AdSpendChartProps {
  data: AdSpendData;
  isFocusMode?: boolean;
}

const AdSpendChart: React.FC<AdSpendChartProps> = ({ data, isFocusMode }) => {
  const chartRef = useRef<any>(null);
  const [showDiff, setShowDiff] = useState(false);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipAlign, setTooltipAlign] = useState<"center" | "left" | "right">("center");
  const hoveredDataRef = useRef<any>(null);
  const tooltipPosRef = useRef({ x: 0, y: 0 });
  const showTooltipRef = useRef(false);
  const tooltipAlignRef = useRef<"center" | "left" | "right">("center");

  const keyMoments = useMemo(() => {
    let maxPosDelta = 0;
    let maxPosIndex = -1;
    let maxSpend = 0;
    let maxSpendIndex = -1;
    let minSpend = Infinity;
    let minSpendIndex = -1;

    data.data.forEach((d, i) => {
      const delta = d["2025"] - d["2024"];
      const spend2025 = d["2025"];

      // Track highest growth (Peak Performance)
      if (delta > maxPosDelta) {
        maxPosDelta = delta;
        maxPosIndex = i;
      }

      // Track highest and lowest spend
      if (spend2025 > maxSpend) {
        maxSpend = spend2025;
        maxSpendIndex = i;
      }
      if (spend2025 < minSpend) {
        minSpend = spend2025;
        minSpendIndex = i;
      }
    });

    const getMomentData = (
      idx: number,
      value: number,
      type: string,
      isSpendBased: boolean = false,
    ) => {
      if (idx === -1) return null;
      const target = data.data[idx];
      const percentage = isSpendBased ? 0 : target ? Math.round((value / target["2024"]) * 100) : 0;
      return {
        index: idx,
        value: isSpendBased ? value : value,
        percentage,
        type,
        date: target?.date,
        isSpendBased,
      };
    };

    const peak = getMomentData(maxPosIndex, maxPosDelta, "positive", false);
    const lowestSpend = getMomentData(minSpendIndex, minSpend, "lowest", true);

    return { peak, lowestSpend };
  }, [data]);

  const processed = useMemo(
    () => ({
      labels: data.data.map((d) => d.date),
      data2025: data.data.map((d) => d["2025"]),
      data2024: data.data.map((d) => d["2024"]),
    }),
    [data],
  );

  const chartData: ChartData<"line"> = useMemo(
    () => ({
      labels: processed.labels,
      datasets: [
        {
          label: "2025 Spend",
          data: processed.data2025,
          borderColor: "#8B5CF6",
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(139, 92, 246, 0.4)");
            gradient.addColorStop(1, "rgba(139, 92, 246, 0.0)");
            return gradient;
          },
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
          data: processed.data2024,
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
          hidden: !showDiff ? false : false,
        },
      ],
    }),
    [processed, showDiff],
  );

  const options: ChartOptions<"line"> = useMemo(
    () => ({
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
          enabled: false,
          external: (context) => {
            const { chart, tooltip } = context;
            if (tooltip.opacity === 0) {
              if (showTooltipRef.current) {
                showTooltipRef.current = false;
                setShowTooltip(false);
              }
              return;
            }

            const canvasRect = chart.canvas.getBoundingClientRect();

            const dataIndex = tooltip.dataPoints[0].dataIndex;
            const date = processed.labels[dataIndex];
            const val2025 = processed.data2025[dataIndex];
            const val2024 = processed.data2024[dataIndex];

            const newData = { date, val2025, val2024 };
            const newPos = {
              x: canvasRect.left + tooltip.caretX,
              y: canvasRect.top + tooltip.caretY,
            };

            // Calculate alignment
            const xRatio = tooltip.caretX / canvasRect.width;
            let newAlign: "center" | "left" | "right" = "center";
            if (xRatio < 0.2) newAlign = "left";
            else if (xRatio > 0.8) newAlign = "right";

            // Only update if alignment changed
            if (tooltipAlignRef.current !== newAlign) {
              tooltipAlignRef.current = newAlign;
              setTooltipAlign(newAlign);
            }

            // Only update if data changed (using date as proxy for deep equality)
            if (!hoveredDataRef.current || hoveredDataRef.current.date !== newData.date) {
              hoveredDataRef.current = newData;
              setHoveredData(newData);
            }

            // Only update if position changed significantly
            if (
              Math.abs(tooltipPosRef.current.x - newPos.x) > 1 ||
              Math.abs(tooltipPosRef.current.y - newPos.y) > 1
            ) {
              tooltipPosRef.current = newPos;
              setTooltipPos(newPos);
            }

            if (!showTooltipRef.current) {
              showTooltipRef.current = true;
              setShowTooltip(true);
            }
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
        mode: "nearest",
        axis: "x",
        intersect: true,
      },
    }),
    [processed],
  );

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group relative w-full rounded-[2rem] border border-white/5 bg-slate-900/40 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:p-8"
    >
      {/* Background Breath Effect */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-brand-purple/5 blur-3xl"
      />

      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <motion.div variants={itemVariants}>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-brand-purple/10 p-2">
              <Activity className="text-brand-purple" size={20} />
            </div>
            <h2 className="text-md font-bold text-white md:text-xl">Ad Spend Performance</h2>
          </div>
          <p className="max-w-xs text-xs text-slate-400 md:text-sm">
            Performance patterns detected across Jan 2024 vs Jan 2025.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-8">
          <div className="text-right">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Avg. Daily Spend
            </p>
            <p className="text-xl font-black tabular-nums text-white md:text-2xl">
              <CountUp to={524.5} prefix="$" decimals={2} />
            </p>
          </div>
          <div className="hidden h-12 w-px bg-white/5 md:block" />
          <div className="text-right">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Growth
            </p>
            <p className="text-xl font-black tabular-nums text-emerald-400 md:text-2xl">
              <CountUp to={24.8} suffix="%" decimals={1} />
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="relative h-[400px] w-full">
        <Line
          ref={chartRef}
          data={chartData}
          options={{
            ...options,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
          }}
        />

        {isFocusMode &&
          [keyMoments.peak, keyMoments.lowestSpend]
            .filter((m): m is NonNullable<typeof m> => m !== null)
            .map((moment, i) => (
              <motion.div
                key={`${moment.type}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
                className="pointer-events-none absolute flex flex-col items-center"
                style={{
                  left: `${(moment.index / (data.data.length - 1)) * 100}%`,
                  top: moment.type === "positive" ? "20%" : "60%",
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  className={`mb-2 whitespace-nowrap rounded-full border border-white/20 ${
                    moment.type === "positive" ? "bg-brand-purple" : "bg-emerald-500"
                  } px-3 py-1.5 text-[10px] font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] backdrop-blur-md`}
                >
                  {moment.type === "positive" ? "🚀" : "💡"}{" "}
                  {moment.type === "positive" ? "Peak Performance" : "Lowest Spend"}{" "}
                  {moment.isSpendBased
                    ? `$${moment.value.toLocaleString()}`
                    : `${moment.value > 0 ? "+" : ""}${moment.percentage}%`}
                </div>
                <div
                  className={`h-16 w-px ${
                    moment.type === "positive"
                      ? "bg-gradient-to-b from-brand-purple to-transparent"
                      : "bg-gradient-to-b from-emerald-500 to-transparent"
                  }`}
                />
              </motion.div>
            ))}
      </motion.div>

      {showTooltip && hoveredData && (
        <div
          className={`pointer-events-none fixed z-50 -translate-y-[110%] transform transition-transform duration-75 ${
            tooltipAlign === "left"
              ? "translate-x-0"
              : tooltipAlign === "right"
                ? "-translate-x-full"
                : "-translate-x-1/2"
          }`}
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-w-[180px] rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              {hoveredData.date}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-brand-purple-light">2025</span>
                <span className="text-sm font-bold text-white">
                  ${hoveredData.val2025.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-teal-400">2024</span>
                <span className="border-b border-dashed border-slate-600 text-sm font-bold text-slate-300">
                  ${hoveredData.val2024.toLocaleString()}
                </span>
              </div>

              <div className="my-2 h-px w-full bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Delta</span>
                <div
                  className={`flex items-center gap-1 text-xs font-black ${hoveredData.val2025 >= hoveredData.val2024 ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {hoveredData.val2025 >= hoveredData.val2024 ? "+" : ""}
                  {Math.round(
                    ((hoveredData.val2025 - hoveredData.val2024) / hoveredData.val2024) * 100,
                  )}
                  %
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdSpendChart;
