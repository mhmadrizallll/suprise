import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift as GiftIcon, Sparkles } from "lucide-react";

const rewards = [
  "🍦 Voucher 1x Traktir Es Krim",
  "☕ Voucher 1x Ngopi Bareng",
  "🎵 1x Request Lagu Bebas",
  "💬 1x Curhat Priority Pass",
  "😆 1x Dengerin Cerita Sampai Selesai",
  "✨ Bonus: Senyum Hari Ini",
];

export default function Gift({ onNext }: { onNext: () => void }) {
  const [rolling, setRolling] = useState(false);
  const [capsule, setCapsule] = useState(false);
  const [reward, setReward] = useState("");

  const rollMachine = () => {
    if (rolling || capsule) return;

    setRolling(true);

    setTimeout(() => {
      const random = rewards[Math.floor(Math.random() * rewards.length)];

      setReward(random);
      setCapsule(true);
      setRolling(false);
    }, 2500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: 40,
        }}
      >
        ✨ Mesin Keberuntungan ✨
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,.7)",
          marginBottom: 50,
        }}
      >
        Aku menyiapkan beberapa hadiah kecil.
        <br />
        Tapi kamu hanya boleh mengambil satu 😆
      </p>

      {/* MACHINE */}
      <motion.div
        animate={{
          rotate: rolling ? [0, -8, 8, -8, 8, 0] : 0,
        }}
        transition={{
          duration: 0.4,
          repeat: rolling ? Infinity : 0,
        }}
        style={{
          width: 260,
          height: 320,
          borderRadius: 30,
          background:
            "linear-gradient(135deg, rgba(255,255,255,.15), rgba(255,255,255,.05))",
          border: "1px solid rgba(255,255,255,.1)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <GiftIcon size={70} color="white" />

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={rollMachine}
          disabled={rolling}
          style={{
            padding: "12px 24px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
          }}
        >
          {rolling ? "Memutar..." : "Putar Mesin"}
        </motion.button>
      </motion.div>

      {/* CAPSULE */}
      <AnimatePresence>
        {capsule && (
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            style={{
              marginTop: 50,
              textAlign: "center",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#60A5FA,#F472B6)",
                margin: "0 auto",
                cursor: "pointer",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
            >
              <h3
                style={{
                  color: "white",
                  marginTop: 20,
                }}
              >
                🎉 Hadiahmu
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.9)",
                  marginTop: 10,
                }}
              >
                {reward}
              </p>

              <button
                onClick={onNext}
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Lanjut ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
