"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const imageList = Array.from({ length: 18 }, (_, i) => `/game-photos/${i + 1}.jpg`);
const imagePairs = imageList.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const heartLayout = [
  [null, null, 0,  1,  null, 2,  3,  null, null],
  [null, 4,  5,  6,  7,  8,  9,  10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type Props = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({ handleShowProposal }: Props) {
  // All hooks at the top — no early returns before this point
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>(imagePairs);
  const [mounted, setMounted] = useState(false);

  // Shuffle only on client to avoid hydration mismatch
  useEffect(() => {
    setImages(shuffleArray([...imagePairs]));
    setMounted(true);
  }, []);

  // Win condition
  useEffect(() => {
    if (mounted && matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, mounted, handleShowProposal]);

  const handleClick = useCallback(async (index: number) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev) => [...prev, index]);

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000);
        setTimeout(() => setSelected([]), 1000);
      }
    } else {
      setSelected([index]);
    }
  }, [selected, matched, images]);

  // Early return AFTER all hooks
  if (!mounted) return null;

  return (
    <div className="grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
      {/* Preload images */}
      <div className="hidden">
        {images.map((image, i) => (
          <Image key={i} src={image} alt="" fill className="object-cover" priority />
        ))}
      </div>

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer"
            whileHover={{ scale: matched.includes(index) ? 1 : 1.08 }}
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }}
          >
            {/* Card back — deep red/gold */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className="w-full h-full absolute z-10 rounded-sm lg:rounded-md overflow-hidden"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: selected.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #3d0010 0%, #1a0005 40%, #2a0800 70%, #1c0a00 100%)",
                    border: "1px solid rgba(212,175,55,0.35)",
                    boxShadow: "inset 0 0 12px rgba(196,30,58,0.2)",
                  }}
                >
                  <svg width="30" height="27" viewBox="0 0 60 54" fill="none" opacity="0.55">
                    <path
                      d="M30 52C30 52 2 34 2 16C2 8.3 8.3 2 16 2C21.5 2 26.3 5.1 28.8 9.7L30 12L31.2 9.7C33.7 5.1 38.5 2 44 2C51.7 2 58 8.3 58 16C58 34 30 52 30 52Z"
                      fill="url(#cardHeart)"
                    />
                    <defs>
                      <linearGradient id="cardHeart" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#b8960c" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Card front — photo */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className="w-full h-full absolute rounded-sm lg:rounded-md overflow-hidden"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  backfaceVisibility: "hidden",
                  boxShadow: matched.includes(index)
                    ? "0 0 12px rgba(212,175,55,0.7), 0 0 4px rgba(212,175,55,0.4)"
                    : "none",
                  border: matched.includes(index)
                    ? "1px solid rgba(212,175,55,0.6)"
                    : "1px solid rgba(196,30,58,0.3)",
                }}
              >
                <Image
                  src={images[index]}
                  alt={`Memory ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {matched.includes(index) && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.div>
            )}

            {/* Incorrect flash */}
            {incorrect.includes(index) && (
              <motion.div
                className="absolute inset-0 rounded-sm lg:rounded-md z-20"
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.6 }}
                style={{ background: "rgba(139,0,0,0.8)" }}
              />
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
        )
      )}
    </div>
  );
}