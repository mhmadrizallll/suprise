import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  onNext: () => void;
};

const memories = [
  {
    title: "Awal Yang Tak Disangka",
    text: "Kadang obrolan sederhana bisa membuat seseorang menjadi lebih menarik dari yang diduga.",
  },
  {
    title: "Momen Yang Tertinggal",
    text: "Ada beberapa percakapan yang entah kenapa masih teringat sampai sekarang.",
  },
  {
    title: "Hari Yang Spesial",
    text: "Dan hari ini, aku membuat halaman kecil ini khusus untuk kamu.",
  },
];

export default function Timeline({ onNext }: Props) {
  const [opened, setOpened] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const openCrystal = (index: number) => {
    if (!opened.includes(index)) {
      setOpened((prev) => [...prev, index]);
    }

    setActive(index);
  };

  const progress = `${opened.length}/3`;

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.08), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: 10,
            fontSize: 34,
          }}
        >
          ✦ Kenangan Yang Tersimpan ✦
        </motion.h2>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,.6)",
            marginBottom: 60,
          }}
        >
          {progress} ditemukan
        </p>

        {/* Crystal Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 30,
            alignItems: "center",
          }}
        >
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              onClick={() => openCrystal(index)}
              whileHover={{
                scale: 1.08,
                y: -8,
              }}
              whileTap={{
                scale: 0.95,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 32,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.03))",
                  border: "1px solid rgba(255,255,255,.12)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 0 40px rgba(255,255,255,.08)",
                }}
              >
                <Sparkles size={42} color="white" />

                <span
                  style={{
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  Crystal #{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {opened.length === memories.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 60,
            }}
          >
            <button
              onClick={onNext}
              style={{
                padding: "14px 30px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                cursor: "pointer",
                backdropFilter: "blur(20px)",
              }}
            >
              Lanjut ✨
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99,
            }}
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
              style={{
                width: "90%",
                maxWidth: 500,
                padding: 30,
                borderRadius: 30,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                border: "1px solid rgba(255,255,255,.1)",
                backdropFilter: "blur(30px)",
                textAlign: "center",
              }}
            >
              <Sparkles
                size={36}
                color="white"
                style={{
                  marginBottom: 20,
                }}
              />

              <h3
                style={{
                  color: "white",
                  marginBottom: 15,
                }}
              >
                {memories[active].title}
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.8)",
                  lineHeight: 1.8,
                }}
              >
                {memories[active].text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
