import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Card = {
  emoji: string;
  title: string;
  short: string;
  detail: string;
  color: string;
};

const cards: Card[] = [
  {
    emoji: "🍜",
    title: "Makan",
    short: "Kalau kamu lagi lapar...",
    detail:
      "Aku ingin jadi orang yang bisa nemenin kamu makan, kapan pun kamu nyaman.",
    color: "#EC4899",
  },
  {
    emoji: "☕",
    title: "Ngopi",
    short: "Kalau kamu lagi capek...",
    detail:
      "Mungkin kita bisa duduk sebentar, ngobrol hal kecil yang bikin ringan.",
    color: "#38BDF8",
  },
  {
    emoji: "🎬",
    title: "Nonton",
    short: "Kalau kamu ingin kabur sebentar...",
    detail:
      "Aku senang kalau bisa jadi teman di sela dunia yang kadang terlalu ramai.",
    color: "#F59E0B",
  },
  {
    emoji: "🚶",
    title: "Jalan",
    short: "Kalau kamu ingin udara baru...",
    detail:
      "Kita bisa jalan tanpa tujuan, cuma menikmati waktu yang berjalan pelan.",
    color: "#10B981",
  },
];

export default function GentleInvitation({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<Card | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0b0618 70%, #05010a 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
          Kalau Suatu Hari Kamu Mau
        </h1>
        <p style={{ opacity: 0.7, maxWidth: 500 }}>
          Ini bukan ajakan yang harus dijawab sekarang.
          <br />
          Kamu bebas memilih, atau bahkan tidak memilih sama sekali.
        </p>
      </motion.div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.2rem",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(card)}
            style={{
              padding: "1.5rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              boxShadow: `0 0 20px ${card.color}22`,
            }}
          >
            <div style={{ fontSize: "2.2rem" }}>{card.emoji}</div>
            <h3 style={{ marginTop: "0.5rem" }}>{card.title}</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>{card.short}</p>
          </motion.div>
        ))}
      </div>

      {/* Ending Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: "3rem",
          padding: "12px 28px",
          borderRadius: "999px",
          border: "none",
          background: "linear-gradient(135deg, #ec4899, #f59e0b)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        ❤️ Mungkin Suatu Hari
      </motion.button>

      {/* Modal Detail */}
      <AnimatePresence>
        {selected && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(6px)",
                zIndex: 50,
              }}
            />

            {/* modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 100,
                width: "min(90%, 420px)",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "24px",
                  padding: "2rem",
                  textAlign: "center",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div style={{ fontSize: "3rem" }}>{selected.emoji}</div>
                <h2 style={{ marginTop: "1rem" }}>{selected.title}</h2>

                <p
                  style={{ marginTop: "1rem", opacity: 0.85, lineHeight: 1.6 }}
                >
                  {selected.detail}
                </p>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: "1.5rem",
                    padding: "10px 20px",
                    borderRadius: "999px",
                    border: "none",
                    background: selected.color,
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
