import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Untuk kamu...",
  "ada sesuatu yang aku simpan di sini",
  "pelan-pelan, aku ingin kamu melihatnya",
];

export default function Opening({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < lines.length) {
      const t = setTimeout(() => setIndex(index + 1), 1400);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [index]);

  return (
    <div style={styles.wrapper}>
      {/* 🌌 BACKGROUND */}
      <div style={styles.bg} />

      {/* 💖 ICON / ASSET FOCUS */}
      <motion.img
        src="/assets/glow-heart.png"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={styles.icon}
      />

      {/* TEXT CARD */}
      <div style={styles.card}>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={styles.title}
        >
          Untuk Kamu
        </motion.h1>

        {/* 🧠 SMOOTH LINE BY LINE TEXT */}
        <div style={{ marginTop: 20 }}>
          {lines.slice(0, index).map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              style={styles.text}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* 🔘 BUTTON */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              onClick={onNext}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.6 }}
              style={styles.button}
            >
              Masuk Cerita ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 🎨 STYLE */
const styles: any = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "sans-serif",
  },

  bg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at center, #0f0f1a, #000)",
  },

  icon: {
    position: "absolute",
    width: 120,
    top: "18%",
    filter: "blur(0px)",
    opacity: 0.8,
  },

  card: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: 30,
    borderRadius: 20,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    maxWidth: 500,
  },

  title: {
    fontSize: 36,
    color: "white",
    fontWeight: 500,
  },

  text: {
    fontSize: 16,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.8,
    marginBottom: 6,
  },

  button: {
    marginTop: 30,
    padding: "12px 24px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },
};
