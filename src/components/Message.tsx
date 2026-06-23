import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./Envelope";

export default function Message({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* 🌌 BACKGROUND MOOD */}
      <div style={styles.bg} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.container}
      >
        {/* SMALL INTRO TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={styles.subText}
        >
          ada sesuatu yang ingin aku sampaikan...
        </motion.p>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.title}
        >
          💌 A Letter For You
        </motion.h2>

        {/* ENVELOPE */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: 40 }}
        >
          <Envelope content="Selamat ulang tahun ❤️" />
        </motion.div>

        {/* CONTINUE BUTTON (ONLY AFTER ENVELOPE FEELS DONE) */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: 40 }}
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.button}
              >
                Lanjut →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: any = {
  wrapper: {
    minHeight: "100vh",
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

  container: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: 600,
  },

  subText: {
    color: "rgba(255,255,255,.5)",
    fontSize: 14,
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: 500,
  },

  button: {
    padding: "12px 26px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.06)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },
};
