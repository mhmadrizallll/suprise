import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Untuk kamu...",
  "aku punya sesuatu.",
  "yang mungkin kamu nggak nyangka 🎂",
];

export default function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < lines.length) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, 1800); // timing cinematic (jangan terlalu cepat)
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [index]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 9999,
          padding: 20,
        }}
      >
        {/* TEXT AREA */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 24,
            lineHeight: 1.6,
            maxWidth: 500,
          }}
        >
          {lines.slice(0, index).map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: 10 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* BUTTON */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFinish}
              style={{
                marginTop: 40,
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
              }}
            >
              Mulai ✨
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
