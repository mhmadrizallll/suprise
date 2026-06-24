"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { Gift, Sparkles } from "lucide-react";

const rewards = [
  "🍦 Voucher Traktir Es Krim",
  "☕ Voucher Ngopi Berdua",
  "🎬 Pilih Film, Aku yang Nemenin",
  "🍜 Pilih Tempat Makan, Aku yang Traktir",
  "💌 Surat Rahasia Dariku",
  "🌹 Bonus Pujian Spesial",
  "🎵 Request Lagu Bebas",
  "😆 Curhat Priority Pass",
];

export default function GiftPage({ onNext }: { onNext: () => void }) {
  const [rolling, setRolling] = useState(false);
  const [capsule, setCapsule] = useState(false);
  const [opened, setOpened] = useState(false);

  const [reward, setReward] = useState("");
  const [displayReward, setDisplayReward] = useState("");

  const [showConfetti, setShowConfetti] = useState(false);

  const [playSpin] = useSound("/sounds/spin.mp3", {
    volume: 0.4,
  });

  const [playReward] = useSound("/sounds/reward.mp3", {
    volume: 0.6,
  });

  const [opening, setOpening] = useState(false);

  const openCapsule = () => {
    if (opened || opening) return;

    setOpening(true);

    setTimeout(() => {
      playReward();

      requestAnimationFrame(() => {
        setOpened(true);
        setOpening(false);
      });
    }, 2000);
  };

  const rollMachine = () => {
    if (rolling || capsule) return;

    setRolling(true);
    playSpin();

    const interval = setInterval(() => {
      setDisplayReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const result = rewards[Math.floor(Math.random() * rewards.length)];

      setReward(result);

      setCapsule(true);
      setRolling(false);
    }, 4000);
  };

  useEffect(() => {
    if (opened) {
      setShowConfetti(true);

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [opened]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-slate-950 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
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

      {showConfetti && <Confetti recycle={false} numberOfPieces={250} />}

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 text-5xl font-extrabold text-white">
            ✨ Mesin Keberuntungan ✨
          </h2>

          <p className="mb-12 text-lg text-white/70">
            Aku sudah menyiapkan beberapa hadiah kecil.
            <br />
            Tapi kamu cuma boleh ambil satu 😆
          </p>
        </motion.div>

        {/* MACHINE */}
        <motion.div
          animate={{
            rotate: rolling ? [0, -6, 6, -6, 6, 0] : 0,
          }}
          transition={{
            duration: 0.3,
            repeat: rolling ? Infinity : 0,
          }}
          className="relative flex h-[360px] w-[280px] flex-col items-center justify-center rounded-[35px]
          border border-white/20
          bg-white/10
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(236,72,153,.35)]"
        >
          {/* Neon Light */}
          <div className="absolute -top-4 h-8 w-40 rounded-full bg-pink-500 blur-2xl" />

          {/* Decorative Balls */}
          <div className="absolute top-10 flex gap-2">
            <div className="h-5 w-5 rounded-full bg-pink-400" />
            <div className="h-5 w-5 rounded-full bg-blue-400" />
            <div className="h-5 w-5 rounded-full bg-yellow-400" />
            <div className="h-5 w-5 rounded-full bg-purple-400" />
          </div>

          <Gift size={80} className="text-white drop-shadow-lg" />

          <div className="mt-4 h-12 w-52 rounded-xl bg-black/30 px-3 flex items-center justify-center text-white text-sm">
            {rolling ? displayReward : "🎁 Hadiah Rahasia"}
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            disabled={rolling}
            onClick={rollMachine}
            className="mt-8 rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-lg"
          >
            {rolling ? "Memutar..." : "🎰 Putar Mesin"}
          </motion.button>

          {rolling && (
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="mt-6"
            >
              <Sparkles className="text-yellow-300" size={30} />
            </motion.div>
          )}
        </motion.div>

        {/* CAPSULE */}
        <AnimatePresence>
          {capsule && (
            <motion.div
              initial={{
                y: 120,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
              }}
              className="mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCapsule}
                className="mx-auto flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-pink-500 text-5xl"
              >
                {opening ? "✨" : "🟣"}
              </motion.div>

              {!opened && !opening && (
                <p className="mt-4 text-white/70">
                  Klik kapsul untuk membuka hadiah 🎁
                </p>
              )}

              {opening && (
                <p className="mt-4 text-yellow-300 animate-pulse">
                  Membuka kapsul...
                </p>
              )}

              <AnimatePresence>
                {opened && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl"
                  >
                    <h3 className="mb-4 text-3xl font-bold text-white">
                      🎉 Hadiah Kamu
                    </h3>

                    <p className="text-xl text-white">{reward}</p>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      onClick={onNext}
                      className="mt-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 font-semibold text-white"
                    >
                      Lanjut ✨
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
