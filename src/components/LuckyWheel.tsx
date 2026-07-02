import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type Slice = {
  emoji: string;
  title: string;
  message: string;
  color1: string;
  color2: string;
};

const slices: Slice[] = [
  {
    emoji: "🙂",
    title: "Jujur aja",
    message: "Aku gak tau kamu bakal sampai sejauh ini atau enggak.",
    color1: "#A78BFA",
    color2: "#7C3AED",
  },
  {
    emoji: "🌙",
    title: "Tapi makasih",
    message: "Udah luangin waktu buat lihat semua yang aku buat ini.",
    color1: "#60A5FA",
    color2: "#2563EB",
  },
  {
    emoji: "🫧",
    title: "Aku gak minta apa-apa",
    message: "Gak ada yang harus kamu balas, serius.",
    color1: "#34D399",
    color2: "#059669",
  },
  {
    emoji: "🌿",
    title: "Kalau suatu hari",
    message: "Kalau kamu lagi pengen ngobrol / jalan / ngopi, aku ada.",
    color1: "#FBBF24",
    color2: "#F59E0B",
  },
  {
    emoji: "🫶",
    title: "Kalau enggak juga",
    message: "Gak apa-apa. Aku tetap senang kamu pernah di sini.",
    color1: "#FB7185",
    color2: "#E11D48",
  },
  {
    emoji: "✨",
    title: "Udahan",
    message: "Kayaknya cukup sampai sini. sisanya biar waktu aja.",
    color1: "#F472B6",
    color2: "#EC4899",
  },
];

const SIZE = 500;
const CENTER = SIZE / 2;
const RADIUS = 230;

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeSlice(startAngle: number, endAngle: number) {
  const start = polarToCartesian(CENTER, CENTER, RADIUS, endAngle);
  const end = polarToCartesian(CENTER, CENTER, RADIUS, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export default function StoryWheel({ onNext }: { onNext: () => void }) {
  const sliceAngle = 360 / slices.length;

  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const pointerControls = useAnimation();
  const spinAudio = useRef<HTMLAudioElement | null>(null);
  const winAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinAudio.current = new Audio("/sounds/spin.mp3");
    winAudio.current = new Audio("/sounds/magic.mp3");

    if (spinAudio.current) spinAudio.current.volume = 0.4;
    if (winAudio.current) winAudio.current.volume = 0.4;
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1.5,
        duration: Math.random() * 4 + 2,
      })),
    [],
  );

  // Efek getar jarum yang disesuaikan saat berputar
  useEffect(() => {
    if (!spinning) return;
    const interval = setInterval(() => {
      pointerControls.start({
        rotate: [-15, 5, 0],
        transition: { duration: 0.12, ease: "easeInOut" },
      });
    }, 180);

    return () => clearInterval(interval);
  }, [spinning, pointerControls]);

  const spin = () => {
    if (spinning) return;

    setSelected(null);
    setSpinning(true);
    spinAudio.current?.play().catch(() => {});

    const winner = Math.floor(Math.random() * slices.length);
    const extraTurns = 360 * 5;
    const targetAngle = 360 - (winner * sliceAngle + sliceAngle / 2);
    const finalRotation =
      rotation + extraTurns + (targetAngle - (rotation % 360));

    setRotation(finalRotation);

    setTimeout(() => {
      setSelected(winner);
      setSpinning(false);
      winAudio.current?.play().catch(() => {});
    }, 5500);
  };

  return (
    <div style={styles.container}>
      {/* Aurora Ambient Background */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={styles.ambientGlow}
      />

      {/* Latar Belakang Bintang */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.2, 1] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            ...styles.star,
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>✨ Terakhir Kali Putar Ini</h1>
        <p style={styles.subtitle}>Bukan game, cuma cara lain buat bercerita</p>
      </div>

      {/* Spinner Wheel Wrapper */}
      <div style={styles.wheelWrapper}>
        {/* Pointer Penunjuk */}
        <motion.div
          animate={pointerControls}
          style={styles.pointer}
          initial={{ y: 0 }}
          whileHover={{ y: -4 }}
        >
          ▼
        </motion.div>

        {/* Lingkaran Roda Utama */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          animate={{ rotate: rotation }}
          transition={{ duration: 5.5, ease: [0.25, 1, 0.2, 1] }}
          style={styles.svgWheel}
        >
          <defs>
            {slices.map((s, i) => (
              <linearGradient
                key={i}
                id={`g${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={s.color1} />
                <stop offset="100%" stopColor={s.color2} />
              </linearGradient>
            ))}
            {/* Efek bayangan dalam roda */}
            <radialGradient id="wheelShadow">
              <stop offset="80%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
          </defs>

          {/* Render Potongan Roda */}
          {slices.map((s, i) => {
            const start = i * sliceAngle;
            const end = start + sliceAngle;
            return (
              <g key={i}>
                <path
                  d={describeSlice(start, end)}
                  fill={`url(#g${i})`}
                  stroke="#110c29"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Lapisan Bayangan Lingkaran */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="url(#wheelShadow)"
            pointerEvents="none"
          />

          {/* Render Konten Teks dan Emoji (Sudah Disesuaikan Kemiringannya) */}
          {slices.map((s, i) => {
            const angle = i * sliceAngle + sliceAngle / 2;
            const pos = polarToCartesian(CENTER, CENTER, 155, angle);
            // Memutar teks agar sejajar searah jari-jari roda
            const textRotation = angle;

            return (
              <g
                key={i}
                transform={`translate(${pos.x},${pos.y}) rotate(${textRotation})`}
              >
                <text textAnchor="middle" fontSize={26} dy="-10">
                  {s.emoji}
                </text>
                <text
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="#fff"
                  letterSpacing="0.5"
                >
                  {s.title.toUpperCase()}
                </text>
              </g>
            );
          })}
        </motion.svg>

        {/* Tombol Putar Tengah */}
        <motion.button
          onClick={spin}
          disabled={spinning}
          whileHover={{ scale: spinning ? 1 : 1.05 }}
          whileTap={{ scale: spinning ? 1 : 0.92 }}
          style={{
            ...styles.spinButton,
            cursor: spinning ? "not-allowed" : "pointer",
            boxShadow: spinning ? "none" : "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {spinning ? "..." : "PUTAR"}
        </motion.button>
      </div>

      {/* Modal Dialog Hasil Akhir */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={styles.modalContent}
            >
              <div style={styles.modalEmoji}>{slices[selected].emoji}</div>
              <h2 style={styles.modalTitle}>{slices[selected].title}</h2>
              <p style={styles.modalMessage}>{slices[selected].message}</p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNext}
                style={styles.modalButton}
              >
                Selesai
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Koleksi Styling Terpisah agar rapi
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    background:
      "radial-gradient(circle at center, #16113a 0%, #090514 70%, #030106 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    overflow: "hidden",
    color: "#fff",
  },
  ambientGlow: {
    position: "absolute",
    width: 650,
    height: 650,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 75%)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
  star: {
    position: "absolute",
    borderRadius: "50%",
    background: "#fff",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    zIndex: 10,
    marginBottom: 35,
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    marginBottom: 8,
    background: "linear-gradient(to right, #fff, #c7d2fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    opacity: 0.5,
    fontSize: "0.95rem",
  },
  wheelWrapper: {
    position: "relative",
    width: SIZE,
    height: SIZE,
    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
  },
  pointer: {
    position: "absolute",
    top: -18,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 32,
    zIndex: 50,
    color: "#ff4757",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  },
  svgWheel: {
    width: "100%",
    height: "100%",
  },
  spinButton: {
    position: "absolute",
    width: 85,
    height: 85,
    borderRadius: "50%",
    border: "4px solid #110c29",
    background: "#fff",
    color: "#110c29",
    fontWeight: 800,
    fontSize: "0.95rem",
    letterSpacing: "0.5px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 40,
    transition: "background 0.2s",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(5, 3, 12, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContent: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "40px 30px",
    borderRadius: 24,
    maxWidth: 420,
    width: "90%",
    textAlign: "center",
    boxShadow:
      "0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: 16,
    filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
  },
  modalTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: 12,
  },
  modalMessage: {
    opacity: 0.75,
    lineHeight: "1.6",
    fontSize: "1.05rem",
    marginBottom: 28,
  },
  modalButton: {
    padding: "12px 36px",
    borderRadius: 999,
    border: "none",
    background: "#fff",
    color: "#000",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(255,255,255,0.1)",
  },
};
