"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-blue)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/Texturelabs_Brick_124XL.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center -gap-2 px-4 w-full max-w-[1337px]" style={{ gap: 0 }}>
        {/* "Portfolio" avec avatar au milieu */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center w-full"
        >
          <span
            className="font-display leading-none select-none"
            style={{
              color: "var(--color-peach)",
              fontSize: "var(--hero-font)",
              letterSpacing: "-0.02em",
              marginRight: "var(--hero-margin)",
            }}
          >
            Portf
          </span>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative shrink-0"
            style={{
              width: "var(--hero-avatar)",
              height: "var(--hero-avatar)",
              zIndex: 10,
            }}
          >
            <Image
              src="/images/avatar.png"
              alt="Zoé Marchal"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <span
            className="font-display leading-none select-none"
            style={{
              color: "var(--color-peach)",
              fontSize: "var(--hero-font)",
              letterSpacing: "-0.02em",
              marginLeft: "var(--hero-margin)",
            }}
          >
            lio
          </span>
        </motion.div>

        {/* Sous-titre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-3 sm:gap-6 font-body -mt-2 sm:-mt-4 flex-wrap justify-center"
          style={{ color: "var(--color-peach)" }}
        >
          <span className="text-lg sm:text-2xl md:text-3xl">Marchal Zoé</span>
          <span className="text-2xl sm:text-3xl md:text-4xl">❉</span>
          <span className="text-lg sm:text-2xl md:text-3xl">Graphic Designer</span>
        </motion.div>
      </div>

      {/* Arch bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none"
        style={{ height: "clamp(120px, 18vw, 260px)" }}
      >
        <svg
          viewBox="0 0 1512 260"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,260 Q756,0 1512,260 Z"
            fill="#fce4d8"
          />
        </svg>
      </div>
    </section>
  );
}
