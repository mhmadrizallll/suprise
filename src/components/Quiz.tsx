import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);

  const answers = [
    {
      text: "Lagi kerja keras 😎",
      correct: false,
    },
    {
      text: "Lagi mikirin masa depan 💭",
      correct: false,
    },
    {
      text: "Lagi mikirin kamu 😳",
      correct: true,
    },
  ];

  const handlePick = (index: number) => {
    setSelected(index);

    if (answers[index].correct) {
      setCorrect(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 600 }}>
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: "white",
            marginBottom: 10,
          }}
        >
          🎮 Mind Quiz
        </motion.h2>

        <p style={{ color: "rgba(255,255,255,.6)", marginBottom: 40 }}>
          Menurut kamu, aku lagi ngapain kalau lagi mikirin kamu?
        </p>

        {/* OPTIONS */}
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {answers.map((item, i) => {
            const isSelected = selected === i;

            return (
              <motion.div
                key={i}
                onClick={() => handlePick(i)}
                whileHover={{
                  scale: 1.03,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                animate={
                  isSelected && !item.correct
                    ? {
                        x: [-5, 5, -5, 5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.4 }}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  cursor: "pointer",
                  background:
                    selected === i
                      ? item.correct
                        ? "rgba(0,255,150,.15)"
                        : "rgba(255,80,80,.15)"
                      : "rgba(255,255,255,.06)",
                  border:
                    selected === i
                      ? item.correct
                        ? "1px solid rgba(0,255,150,.4)"
                        : "1px solid rgba(255,80,80,.4)"
                      : "1px solid rgba(255,255,255,.1)",
                  backdropFilter: "blur(12px)",
                  color: "white",
                  transition: "all .3s ease",
                }}
              >
                {item.text}
              </motion.div>
            );
          })}
        </div>

        {/* RESULT */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 30 }}
            >
              {correct ? (
                <>
                  <p style={{ color: "#7CFFB2" }}>
                    ✨ Benar... kamu terlalu jago nebak
                  </p>

                  <motion.button
                    onClick={onNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      marginTop: 15,
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: "none",
                      background: "white",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    Lanjut →
                  </motion.button>
                </>
              ) : (
                <p style={{ color: "rgba(255,255,255,.6)" }}>
                  Hmmm… hampir 😆 coba lagi atau pilih yang lain
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
