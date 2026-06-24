import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Flame, Sparkles } from "lucide-react";

export default function BirthdayWish({ onNext }: { onNext: () => void }) {
  const [blown, setBlown] = useState(false);

  const handleBlow = () => {
    if (blown) return;

    setBlown(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.08), transparent 60%)",
        }}
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: 42,
              marginBottom: 20,
            }}
          >
            Make A Wish ✨
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,.7)",
              lineHeight: 1.8,
              marginBottom: 60,
            }}
          >
            Hari ini adalah hari spesialmu.
            <br />
            Sebelum lanjut...
            <br />
            buat satu harapan terlebih dahulu.
          </p>
        </motion.div>

        {/* Candle */}
        <motion.div
          whileHover={{
            scale: blown ? 1 : 1.05,
          }}
          onClick={handleBlow}
          style={{
            cursor: blown ? "default" : "pointer",
            display: "inline-block",
            position: "relative",
          }}
        >
          {/* Flame */}
          <AnimatePresence>
            {!blown && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  y: [0, -4, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                style={{
                  position: "absolute",
                  top: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Flame size={34} color="#FFD166" />
              </motion.div>
            )}
          </AnimatePresence>

          <Cake size={150} color="white" strokeWidth={1.5} />
        </motion.div>

        <AnimatePresence>
          {!blown && (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              style={{
                color: "rgba(255,255,255,.5)",
                marginTop: 25,
              }}
            >
              Klik lilinnya untuk meniup harapan ✨
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles
                  size={42}
                  color="white"
                  style={{
                    marginTop: 30,
                  }}
                />
              </motion.div>

              <p
                style={{
                  color: "white",
                  fontSize: 18,
                  lineHeight: 2,
                  marginTop: 20,
                }}
              >
                Semoga harapan itu menemukan jalannya ✨
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={onNext}
                style={{
                  marginTop: 30,
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "none",
                  background: "white",
                  color: "black",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Lanjutkan ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
