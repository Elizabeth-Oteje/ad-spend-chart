import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface InsightCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  description?: string;
  delay?: number;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  trend,
  description,
  delay = 0,
}) => {
  const isPositive = trend === "up";
  const isNeutral = trend === "neutral";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.05]"
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>
          <div
            className={`rounded-lg p-1.5 ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : isNeutral
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={14} />
            ) : isNeutral ? (
              <TrendingUp size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
        </div>

        {description && <p className="text-xs font-medium text-slate-400">{description}</p>}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
};

export default InsightCard;
