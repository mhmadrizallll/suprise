"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, Heart } from "lucide-react";

type Props = {
  onNext: () => void;
};

const messages = [
  {
    icon: "💬",
    title: "Pesan Pertama",
    text: "Kadang obrolan sederhana bisa membuat seseorang terasa lebih menarik dari yang diduga.",
  },
  {
    icon: "☕",
    title: "Pesan Kedua",
    text: "Ada beberapa percakapan yang entah kenapa masih teringat sampai sekarang.",
  },
  {
    icon: "🎂",
    title: "Pesan Terakhir",
    text: "Dan karena hari ini spesial, aku membuat halaman kecil ini khusus untuk kamu.",
  },
];

export default function Timeline({ onNext }: Props) {
  const [opened, setOpened] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const openCard = (index: number) => {
    if (!opened.includes(index)) {
      setOpened((prev) => [...prev, index]);
    }

    setActive(index);
  };

  const progress = opened.length;

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
              y: [-15, 15, -15],
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

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-14 text-center"
        >
          <Mail size={60} className="mx-auto mb-5 text-pink-300" />

          <h1 className="text-4xl font-bold text-white md:text-5xl">
            📩 Pesan Rahasia
          </h1>

          <p className="mt-4 text-white/70">
            Ada beberapa hal kecil yang ingin aku sampaikan.
          </p>

          <p className="mt-2 text-pink-300">
            {progress} / {messages.length} terbuka
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {messages.map((item, index) => {
            const isOpened = opened.includes(index);

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => openCard(index)}
                className="cursor-pointer"
              >
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(236,72,153,.1)]">
                  <div className="mb-6 flex justify-center">
                    {isOpened ? (
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="text-5xl"
                      >
                        {item.icon}
                      </motion.div>
                    ) : (
                      <Lock size={50} className="text-white/60" />
                    )}
                  </div>

                  <h3 className="text-center text-xl font-semibold text-white">
                    {isOpened ? item.title : "Pesan Terkunci"}
                  </h3>

                  <p className="mt-3 text-center text-sm text-white/60">
                    {isOpened
                      ? "Klik lagi untuk membaca"
                      : "Klik untuk membuka"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue */}
        <AnimatePresence>
          {opened.length === messages.length && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-14 flex justify-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onNext}
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.5)]"
              >
                Lanjut ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            onClick={() => setActive(null)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-2xl"
            >
              <div className="mb-5 text-6xl">{messages[active].icon}</div>

              <h2 className="mb-5 text-3xl font-bold text-white">
                {messages[active].title}
              </h2>

              <p className="leading-8 text-white/85">{messages[active].text}</p>

              <Heart size={24} className="mx-auto mt-6 text-pink-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
