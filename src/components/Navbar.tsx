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
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-start pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all hover:scale-105 active:scale-95 group">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:rotate-12">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl  font-black tracking-tighter italic leading-[0.9]"
          >
              Ad <span className="text-brand-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">X-RAY.</span>
          </span>
        </Link>
      </div>

    </motion.nav>


  );
};

export default Navbar;


