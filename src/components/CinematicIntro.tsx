"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";

const lines = [
  "✨ Hai kamu...",
  "Aku tahu hari ini adalah hari yang spesial.",
  "Dan karena itu...",
  "Aku menyiapkan sesuatu kecil.",
  "Mungkin sederhana.",
  "Tapi dibuat khusus untukmu. ❤️",
];

export default function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < lines.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2200);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black px-6 text-center"
      >
        {/* Glow */}
        <div className="absolute h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
              }}
              className="absolute h-2 w-2 rounded-full bg-pink-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mb-10"
        >
          <Heart
            size={70}
            className="text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,.7)]"
          />
        </motion.div>

        {/* Text */}
        <div className="relative z-10 max-w-2xl">
          {lines.slice(0, index).map((text, i) => (
            <motion.p
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="mb-5 text-2xl font-medium text-white md:text-3xl"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative z-20 mt-14"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onFinish}
                className="relative z-20 group flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.5)]"
              >
                <Gift size={22} />
                🎁 Buka Kejutan
                <Sparkles
                  size={18}
                  className="group-hover:rotate-12 transition"
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Text */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.5,
          }}
          transition={{
            delay: 1,
          }}
          className="absolute bottom-10 text-sm text-white/50"
        >
          dibuat khusus untuk seseorang yang spesial ✨
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
