"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function BirthdayWish({ onNext }: { onNext: () => void }) {
  const [blown, setBlown] = useState(false);

  const blowAudio = useRef<HTMLAudioElement | null>(null);
  const wishAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    blowAudio.current = new Audio("/sounds/blow.mp3");

    wishAudio.current = new Audio("/sounds/wish-success.mp3");

    wishAudio.current.volume = 0.5;
  }, []);

  const handleBlow = () => {
    if (blown) return;

    blowAudio.current?.play();

    setBlown(true);

    setTimeout(() => {
      wishAudio.current?.play();
    }, 700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      {/* NIGHT BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, #2b1055 0%, #14072f 40%, #05020d 100%)",
        }}
      />

      {/* STARS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
            }}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 5}px`,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* CONFETTI */}
      {blown && <Confetti recycle={false} numberOfPieces={250} />}

      <div className="relative z-10 text-center max-w-2xl">
        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-5xl md:text-6xl text-white font-light"
        >
          Make A Wish ✨
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-6 text-white/70 leading-8"
        >
          Tutup mata sebentar.
          <br />
          Buat satu harapan.
          <br />
          Tidak perlu diberitahu siapa pun.
        </motion.p>

        {/* CAKE */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="relative mt-16 inline-block cursor-pointer"
          onClick={handleBlow}
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full" />

          {/* FLAME */}
          <AnimatePresence>
            {!blown && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 text-5xl"
              >
                🔥
              </motion.div>
            )}
          </AnimatePresence>

          {/* CANDLE */}
          <div className="absolute -top-6 left-1/2 h-12 w-3 -translate-x-1/2 rounded-full bg-yellow-200" />

          {/* CAKE */}
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="text-[180px]"
          >
            🎂
          </motion.div>
        </motion.div>

        {!blown && (
          <motion.p
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mt-8 text-white/50"
          >
            Klik lilinnya untuk meniup harapan ❤️
          </motion.p>
        )}

        {/* SUCCESS */}
        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-10"
            >
              {/* FLOATING HEARTS */}
              <div className="pointer-events-none absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -200,
                    }}
                    transition={{
                      duration: 5,
                      delay: i * 0.15,
                    }}
                    className="absolute text-pink-300"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: "20%",
                    }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-5xl"
              >
                ✨
              </motion.div>

              <h2 className="mt-6 text-3xl text-white">
                Semoga Harapanmu Terkabul
              </h2>

              <p className="mt-6 text-white/70 leading-8 max-w-xl mx-auto">
                Semoga semua hal baik datang menghampirimu tahun ini.
                <br />
                Dan semoga apa yang sedang kamu perjuangkan perlahan menjadi
                nyata.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onNext}
                className="mt-10 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 text-white shadow-[0_0_30px_rgba(236,72,153,.4)]"
              >
                Lanjutkan ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
