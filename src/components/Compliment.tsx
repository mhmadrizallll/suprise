"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const messages = [
  "✨ Kamu itu spesial.",
  "😊 Cara kamu ngobrol selalu bikin nyaman.",
  "🌷 Kamu punya energi yang bikin suasana jadi lebih hangat.",
  "💖 Aku senang bisa kenal kamu.",
  "🎂 Semoga di umur yang baru ini, banyak hal baik datang buat kamu.",
  "❤️ Dan semoga hari ini jadi hari yang menyenangkan untukmu.",
];

export default function Compliment({ onNext }: { onNext: () => void }) {
  const [current, setCurrent] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (current >= messages.length - 1) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1500);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-slate-950 px-6">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12 text-center"
        >
          <Heart size={60} className="mx-auto mb-4 text-pink-400" />

          <h1 className="text-5xl font-extrabold text-white">
            ❤️ Sedikit Untuk Kamu
          </h1>

          <p className="mt-4 text-white/70">
            Ada beberapa hal yang ingin aku bilang...
          </p>
        </motion.div>

        {/* Messages */}
        <div className="space-y-5">
          {messages.slice(0, current + 1).map((msg, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
            >
              <p className="text-lg text-white">{msg}</p>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
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
              className="mt-10 text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mb-8 rounded-3xl border border-pink-400/30 bg-pink-500/10 p-8 backdrop-blur-xl"
              >
                <Sparkles className="mx-auto mb-4 text-yellow-300" />

                <h2 className="mb-3 text-3xl font-bold text-white">
                  🎉 Happy Birthday
                </h2>

                <p className="text-white/90">
                  Terima kasih sudah meluangkan waktu untuk melihat semua ini.
                  <br />
                  Semoga hari-harimu selalu dipenuhi hal-hal baik, tawa yang
                  banyak, dan kebahagiaan yang nggak ada habisnya. ✨
                </p>
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onNext}
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.5)]"
              >
                Selesai ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
