"use client";

import { useState, useEffect, useRef } from "react";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const images = Array.from({ length: 36 }, (_, i) => `/game-photos/${i + 1}.jpg`);

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate floating petals
  useEffect(() => {
    const newPetals = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 8 + Math.random() * 12,
    }));
    setPetals(newPetals);
  }, []);

  // Auto-advance steps
  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => setStep((s) => s + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const getRandomPosition = () => ({
    top: `${5 + Math.random() * 80}%`,
    left: `${5 + Math.random() * 80}%`,
  });

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">

      {/* Background music - YouTube embed hidden */}
      <audio ref={audioRef} loop style={{ display: "none" }} />

      {/* Floating rose petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0 pointer-events-none z-10"
          style={{ left: `${petal.left}%` }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 180, 360],
            x: [0, 30, -20, 10],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 6 6 6 11C6 14.3 8.7 17 12 17C15.3 17 18 14.3 18 11C18 6 12 2 12 2Z"
              fill="url(#petalGrad)"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c41e3a" />
                <stop offset="100%" stopColor="#8b0000" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}

      {/* Ambient gold orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #8b0000 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <AnimatePresence mode="wait">

        {/* Step 0 — Congratulations */}
        {step === 0 && (
          <motion.div
            key="step-0"
            className="flex flex-col items-center text-center px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="60" height="54" viewBox="0 0 60 54" fill="none">
                <path d="M30 52C30 52 2 34 2 16C2 8.3 8.3 2 16 2C21.5 2 26.3 5.1 28.8 9.7L30 12L31.2 9.7C33.7 5.1 38.5 2 44 2C51.7 2 58 8.3 58 16C58 34 30 52 30 52Z"
                  fill="url(#heartGrad)" />
                <defs>
                  <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c41e3a" />
                    <stop offset="100%" stopColor="#8b0000" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <h2
              className={`text-4xl md:text-5xl font-light tracking-widest mb-3 ${cinzel.className}`}
              style={{ color: "#d4af37", textShadow: "0 0 40px rgba(212,175,55,0.4)" }}
            >
              You Did It
            </h2>
            <p className={`text-xl md:text-2xl font-light italic ${cormorant.className}`}
              style={{ color: "rgba(255,255,255,0.7)" }}>
              Every memory unlocked, every moment revealed...
            </p>
          </motion.div>
        )}

        {/* Step 1 — Surprise */}
        {step === 1 && (
          <motion.div
            key="step-1"
            className="flex flex-col items-center text-center px-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
          >
            <div className="mb-6 flex gap-3">
              {["✦", "♥", "✦"].map((s, i) => (
                <motion.span key={i}
                  className="text-2xl"
                  style={{ color: "#d4af37" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
            <h2
              className={`text-4xl md:text-5xl font-light tracking-widest ${cinzel.className}`}
              style={{ color: "#fff", textShadow: "0 0 60px rgba(212,175,55,0.3)" }}
            >
              I Have Something
            </h2>
            <h2
              className={`text-4xl md:text-5xl font-light tracking-widest mt-1 ${cinzel.className}`}
              style={{ color: "#c41e3a", textShadow: "0 0 40px rgba(196,30,58,0.5)" }}
            >
              To Tell You
            </h2>
          </motion.div>
        )}

        {/* Step 2 — The Proposal */}
        {step === 2 && (
          <motion.div
            key="step-2"
            className="flex flex-col items-center text-center px-6 relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {/* Photo mosaic background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-[0.07] -z-10 overflow-hidden rounded-xl">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Gold ornamental divider top */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(to right, transparent, #d4af37)" }} />
              <span style={{ color: "#d4af37", fontSize: "1.2rem" }}>✦</span>
              <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(to left, transparent, #d4af37)" }} />
            </motion.div>

            {/* "I don't deserve you" */}
            <motion.p
              className={`text-lg md:text-xl font-light italic mb-3 ${cormorant.className}`}
              style={{ color: "rgba(212,175,55,0.8)", letterSpacing: "0.15em" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              I don&apos;t deserve you...
            </motion.p>

            <motion.h2
              className={`text-4xl md:text-6xl font-semibold mb-6 ${cinzel.className}`}
              style={{
                color: "#fff",
                textShadow: "0 2px 30px rgba(196,30,58,0.6), 0 0 60px rgba(212,175,55,0.2)",
                letterSpacing: "0.08em",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              Will You Be
              <br />
              <span style={{ color: "#c41e3a" }}>My Valentine?</span>
            </motion.h2>

            {/* Sad hamster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
            >
              <Image src="/sad_hamster.png" alt="Pleading hamster" width={160} height={160} />
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex gap-5 mt-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <button
                className="relative px-8 py-3 text-base font-semibold tracking-widest overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #c41e3a, #8b0000)",
                  color: "#fff",
                  border: "1px solid rgba(212,175,55,0.4)",
                  borderRadius: "2px",
                  fontFamily: cinzel.style.fontFamily,
                  letterSpacing: "0.15em",
                  boxShadow: "0 4px 20px rgba(196,30,58,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                onClick={handleYesClick}
              >
                <span className="relative z-10">Yes, Always 🥰</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #d4224a, #a00010)" }} />
              </button>

              <button
                className="px-6 py-2 text-sm font-semibold tracking-widest transition-all duration-300"
                style={{
                  position: "fixed",
                  top: position ? position.top : "60%",
                  left: position ? position.left : "65%",
                  zIndex: 9999,
                  background: "rgba(30,30,30,0.85)",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "2px",
                  fontFamily: cinzel.style.fontFamily,
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                  transition: "top 0.15s ease, left 0.15s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setPosition(getRandomPosition())}
                onTouchStart={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No 😢
              </button>
            </motion.div>

            {/* Gold ornamental divider bottom */}
            <motion.div
              className="flex items-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2 }}
            >
              <div className="h-px w-10 md:w-16" style={{ background: "linear-gradient(to right, transparent, #d4af37)" }} />
              <span style={{ color: "#d4af37", fontSize: "0.7rem", letterSpacing: "0.3em" }}>♥ ✦ ♥</span>
              <div className="h-px w-10 md:w-16" style={{ background: "linear-gradient(to left, transparent, #d4af37)" }} />
            </motion.div>
          </motion.div>
        )}

        {/* Step 3 — Accepted */}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`flex flex-col items-center text-center px-8 ${cormorant.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                filter: ["drop-shadow(0 0 8px #c41e3a)", "drop-shadow(0 0 24px #d4af37)", "drop-shadow(0 0 8px #c41e3a)"],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-6"
            >
              <svg width="72" height="65" viewBox="0 0 60 54" fill="none">
                <path d="M30 52C30 52 2 34 2 16C2 8.3 8.3 2 16 2C21.5 2 26.3 5.1 28.8 9.7L30 12L31.2 9.7C33.7 5.1 38.5 2 44 2C51.7 2 58 8.3 58 16C58 34 30 52 30 52Z"
                  fill="url(#heartGradFinal)" />
                <defs>
                  <linearGradient id="heartGradFinal" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c41e3a" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <h2
              className={`text-4xl md:text-6xl font-semibold mb-3 ${cinzel.className}`}
              style={{
                color: "#d4af37",
                textShadow: "0 0 40px rgba(212,175,55,0.6)",
                letterSpacing: "0.1em",
              }}
            >
              She Said Yes!
            </h2>

            <p className="text-2xl md:text-3xl font-light italic mb-2"
              style={{ color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em" }}>
              I love you so much, Grace.
            </p>
            <p className="text-lg font-light italic mb-6"
              style={{ color: "rgba(212,175,55,0.7)" }}>
              Every day with you is a gift I&apos;ll never take for granted. 💌
            </p>

            <Image
              src="/hamster_jumping.gif"
              alt="Celebrating hamster"
              width={180}
              height={180}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireworks */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <Fireworks
            options={{ autoresize: true, opacity: 0.7, acceleration: 1.02, friction: 0.97, gravity: 1.5, particles: 90, traceLength: 3, traceSpeed: 10, explosion: 5, intensity: 30, flickering: 50, lineStyle: "round", hue: { min: 0, max: 40 }, delay: { min: 15, max: 30 }, rocketsPoint: { min: 30, max: 70 }, lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } }, brightness: { min: 50, max: 80 }, decay: { min: 0.015, max: 0.03 }, mouse: { click: false, move: false, max: 1 } }}
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          />
        </div>
      )}
    </div>
  );
}