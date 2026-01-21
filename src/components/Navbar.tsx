"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="pointer-events-none fixed left-0 top-0 z-50 flex w-full justify-start px-6 py-6"
    >
      <div className="group pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-2 shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-xl transition-all hover:scale-105 active:scale-95">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center transition-transform group-hover:rotate-12">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-black italic leading-[0.9] tracking-tighter">
            <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Ad</span>{" "}
            <span className="text-brand-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              X-RAY.
            </span>
          </span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
