"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles } from "lucide-react";

export default function Opening({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-slate-950 px-6">
      {/* Glow */}
      <div className="absolute h-[700px] w-[700px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      <div className="relative z-10 text-center">
        {/* Envelope */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setOpened(true)}
            disabled={opened}
            className="group"
          >
            <div className="rounded-full border border-pink-400/20 bg-white/10 p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,.3)]">
              {!opened ? (
                <Mail size={90} className="text-pink-300" />
              ) : (
                <Heart size={90} className="text-pink-400" />
              )}
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened && (
            <motion.div
              key="closed"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="mt-8"
            >
              <h1 className="text-4xl font-bold text-white">
                💌 Sebuah Pesan Untukmu
              </h1>

              <p className="mt-4 text-lg text-white/70">
                Hari ini ada sesuatu yang ingin aku tunjukkan.
              </p>

              <p className="mt-2 text-white/50">klik amplopnya ✨</p>
            </motion.div>
          )}

          {opened && (
            <motion.div
              key="opened"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-8 max-w-xl"
            >
              <h2 className="text-4xl font-bold text-white">❤️</h2>

              <p className="mt-6 text-xl text-white/90 leading-relaxed">
                Aku sebenarnya bisa saja mengucapkan selamat ulang tahun lewat
                chat biasa.
              </p>

              <p className="mt-4 text-white/70">
                Tapi rasanya itu terlalu biasa.
              </p>

              <p className="mt-4 text-white/70">
                Jadi aku membuat sesuatu kecil.
              </p>

              <p className="mt-4 text-pink-300 font-medium">
                Khusus untukmu. 🎂
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onNext}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.5)]"
              >
                <Sparkles size={18} />
                Buka Kejutan
                <Sparkles size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
