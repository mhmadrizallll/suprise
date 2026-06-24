"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "./Envelope";

export default function Message({ onNext }: { onNext: () => void }) {
  const [showEnvelope, setShowEnvelope] = useState(false);

  const content = `
Selamat ulang tahun 🎂

Aku tidak tahu apakah website kecil ini sempurna. Mungkin masih banyak kekurangannya.

Tapi ada satu hal yang pasti.

Semua ini dibuat dengan satu tujuan:
membuatmu tersenyum hari ini.

Karena seseorang sepertimu layak mendapatkan hari yang menyenangkan.

Semoga semua hal baik datang menghampirimu.
Dan semoga senyummu hari ini lebih banyak dari biasanya.

❤️
`;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      {/* NIGHT SKY */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, #2b1055 0%, #14072f 40%, #05020d 100%)",
        }}
      />

      {/* MOON */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute top-20 right-20 h-32 w-32 rounded-full bg-white/90 blur-sm"
      />

      {/* BIG GLOW */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

      {/* STARS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 6}px`,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: -30,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showEnvelope ? (
          <motion.div
            key="intro"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative z-10 text-center max-w-2xl"
          >
            {/* Floating Icon */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="text-8xl"
            >
              💌
            </motion.div>

            <h1 className="mt-8 text-6xl font-light text-white tracking-wide">
              A Little Letter
            </h1>

            <p className="mt-3 text-pink-300 italic text-xl">
              Written especially for you
            </p>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
              }}
              className="mt-10"
            >
              <p className="text-white/80 leading-9 text-lg">
                Sebelum perjalanan kecil ini berakhir,
                <br />
                ada sesuatu yang ingin aku sampaikan.
              </p>

              <p className="mt-5 text-white/50">
                Tidak panjang.
                <br />
                Tapi dibuat dengan tulus.
              </p>
            </motion.div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(236,72,153,.5)",
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setShowEnvelope(true)}
              className="mt-12 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-10 py-4 text-lg font-medium text-white shadow-lg"
            >
              Open The Letter ❤️
            </motion.button>

            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="mt-6 text-sm text-white/40"
            >
              click to open
            </motion.p>
          </motion.div>
        ) : (
          <Envelope content={content} onNext={onNext} />
        )}
      </AnimatePresence>
    </div>
  );
}
