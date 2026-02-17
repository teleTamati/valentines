"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import OrientationGuard from "@/components/OrientationGuard";

const cinzel = Cinzel({ display: "swap", subsets: ["latin"], weight: ["400"] });
const cormorant = Cormorant_Garamond({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
});

const ANIM_DURATION = 2;

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    setShowPrompt(false);
    setMusicStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // autoplay blocked — music will still be available via mute button
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      {/* Direct audio tag — plays song.mp3 from /public */}
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

      <main
        className="flex items-center justify-center min-h-screen overflow-hidden relative"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #1a0008 0%, #0d0005 40%, #000000 100%)",
        }}
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(212,175,55,0.015) 40px,
                rgba(212,175,55,0.015) 41px
              )
            `,
          }}
        />

        {/* Music start prompt overlay */}
        {showPrompt && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, #1a0008 0%, #000000 100%)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center gap-6 text-center px-8"
            >
              {/* Animated heart */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="64" height="58" viewBox="0 0 60 54" fill="none">
                  <path
                    d="M30 52C30 52 2 34 2 16C2 8.3 8.3 2 16 2C21.5 2 26.3 5.1 28.8 9.7L30 12L31.2 9.7C33.7 5.1 38.5 2 44 2C51.7 2 58 8.3 58 16C58 34 30 52 30 52Z"
                    fill="url(#promptHeart)"
                  />
                  <defs>
                    <linearGradient id="promptHeart" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#c41e3a" />
                      <stop offset="100%" stopColor="#8b0000" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              <div>
                <h1
                  className={`text-3xl md:text-4xl mb-2 tracking-widest ${cinzel.className}`}
                  style={{ color: "#d4af37" }}
                >
                  To my dearest,
                </h1>
                <p
                  className={`text-lg md:text-xl font-light italic ${cormorant.className}`}
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Grace
                </p>
              </div>

              <div
                className="h-px w-32"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #d4af37, transparent)",
                }}
              />

              <p
                className={`text-base font-light italic max-w-xs ${cormorant.className}`}
                style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
              >
                Tap to begin your Valentine&apos;s experience
                <br />
                <span style={{ color: "rgba(212,175,55,0.6)", fontSize: "0.85em" }}>
                  ♪ My track will play, but it might be muted by default due to autoplay restrictions. You can unmute it using the button on the top right corner
                </span>
              </p>

              <motion.button
                className="relative px-10 py-4 tracking-widest overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #c41e3a, #8b0000)",
                  color: "#fff",
                  border: "1px solid rgba(212,175,55,0.5)",
                  borderRadius: "2px",
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  boxShadow:
                    "0 6px 30px rgba(196,30,58,0.5), 0 0 0 1px rgba(212,175,55,0.1)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={startMusic}
              >
                Open ♥
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Mute/unmute button — shown after start */}
        {musicStarted && (
          <motion.button
            className="fixed top-4 right-4 z-50 px-3 py-2"
            style={{
              background: "rgba(20,0,8,0.85)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "2px",
              color: "rgba(212,175,55,0.8)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              backdropFilter: "blur(8px)",
              fontFamily: cinzel.style.fontFamily,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMute}
          >
            {isMuted ? "♪ unmute" : "♪ mute"}
          </motion.button>
        )}

        {/* Game / Proposal */}
        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center gap-4"
          >
            {!showPrompt && (
              <motion.div
                className="text-center mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <p
                  className={`text-sm tracking-[0.3em] ${cinzel.className}`}
                  style={{ color: "rgba(212,175,55,0.5)" }}
                >
                  Use your memoryyy...
                </p>
              </motion.div>
            )}
            <PhotoPairGame handleShowProposal={handleShowProposal} />

            {!showPrompt && (
              <motion.p
                className={`text-xs italic ${cormorant.className}`}
                style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                It's like the card game Memory but with photos of us x
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="w-full h-full flex items-center justify-center"
          >
            <ValentinesProposal />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}