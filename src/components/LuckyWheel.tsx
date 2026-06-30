import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type Prize = {
  emoji: string;
  title: string;
  message: string;
  color1: string;
  color2: string;
};

const prizes: Prize[] = [
  {
    emoji: "🍜",
    title: "Makan Bareng",
    message:
      "Kalau kamu berkenan, aku ingin ngajak kamu makan suatu hari nanti. Tempatnya bebas, yang penting ngobrolnya sama kamu.",
    color1: "#FF8FB1",
    color2: "#EC4899",
  },
  {
    emoji: "🎬",
    title: "Nonton",
    message: "Filmnya bebas. Yang penting orang di sebelahku semoga kamu.",
    color1: "#FBBF24",
    color2: "#F59E0B",
  },
  {
    emoji: "🧋",
    title: "Ngopi",
    message:
      "Segelas minuman dan obrolan panjang sepertinya akan menyenangkan.",
    color1: "#7DD3FC",
    color2: "#38BDF8",
  },
  {
    emoji: "🍦",
    title: "Es Krim",
    message: "Sesederhana beli es krim lalu muter kota. Kedengarannya seru.",
    color1: "#6EE7B7",
    color2: "#10B981",
  },
  {
    emoji: "📸",
    title: "Foto Bareng",
    message:
      "Supaya nanti ada satu kenangan yang bisa kita lihat sambil senyum sendiri.",
    color1: "#93C5FD",
    color2: "#3B82F6",
  },
  {
    emoji: "❤️",
    title: "Semua Pilihan",
    message:
      "Kalau suatu hari kamu mau... aku ingin mencoba semuanya, satu per satu, bersama kamu.",
    color1: "#FB7185",
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

export default function LuckyWheel({ onNext }: { onNext: () => void }) {
  const slice = 360 / prizes.length;
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const pointerControls = useAnimation();
  const spinAudio = useRef<HTMLAudioElement | null>(null);
  const winAudio = useRef<HTMLAudioElement | null>(null);
  const tickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinAudio.current = new Audio("/sounds/spin.mp3");
    winAudio.current = new Audio("/sounds/magic.mp3");
    tickAudio.current = new Audio("/sounds/tick.mp3"); // Opsional: suara jarum mendenting jika ada

    [spinAudio, winAudio, tickAudio].forEach((audio) => {
      if (audio.current) audio.current.volume = 0.5;
    });
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 3 + 2,
      })),
    [],
  );

  // Animasi jarum bergetar (Ticking Effect) saat roda berputar
  useEffect(() => {
    if (!spinning) return;

    const interval = setInterval(() => {
      pointerControls.start({
        rotate: [-15, 0],
        transition: { duration: 0.15, ease: "easeOut" },
      });
      tickAudio.current?.play().catch(() => {});
    }, 200);

    return () => clearInterval(interval);
  }, [spinning, pointerControls]);

  const spin = () => {
    if (spinning) return;

    setSelected(null);
    setSpinning(true);
    spinAudio.current?.play().catch(() => {});

    const winner = Math.floor(Math.random() * prizes.length);
    // Tambah putaran dasar minimum 5 kali + kalkulasi presisi ke tengah slice target
    const extraSpins = 360 * 6;
    const targetAngle = 360 - (winner * slice + slice / 2);
    const finalRotation =
      rotation + extraSpins + (targetAngle - (rotation % 360));

    setRotation(finalRotation);

    setTimeout(() => {
      setSelected(winner);
      setSpinning(false);
      winAudio.current?.play().catch(() => {});
    }, 6000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        background:
          "radial-gradient(circle at center, #2e1065 0%, #0f052d 70%, #02000a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Aurora Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "min(90vw, 800px)",
          height: "min(90vw, 800px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Sparkling Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 8px #fff",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Header Section */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          marginBottom: "2.5rem",
          maxWidth: "600px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            margin: "0 0 0.5rem 0",
          }}
        >
          ✨ Roda Semesta ✨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Katanya setiap momen spesial selalu membawa keajaiban kecil. <br />
          Tekan tombol di tengah roda dan lihat apa yang semesta rencanakan
          untuk kita. ❤️
        </motion.p>
      </div>

      {/* Wheel Wrapper */}
      <div
        style={{
          position: "relative",
          width: "min(100%, 500px)",
          aspectRatio: "1/1",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Jarum Penunjuk / Pointer Atas */}
        <motion.div
          animate={pointerControls}
          initial={{ rotate: 0 }}
          style={{
            position: "absolute",
            top: "-15px",
            left: "50%",
            x: "-50%",
            zIndex: 40,
            fontSize: "2.5rem",
            transformOrigin: "top center",
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
          }}
        >
          👇
        </motion.div>

        {/* Lingkaran Luar Roda dengan Efek Neon Dot */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            borderRadius: "50%",
            border: "4px solid rgba(255, 255, 255, 0.15)",
            boxShadow:
              "0 0 30px rgba(236,72,153,0.25), inset 0 0 20px rgba(236,72,153,0.2)",
            pointerEvents: "none",
          }}
        />

        {/* Main SVG Wheel */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          animate={{ rotate: rotation }}
          transition={{ duration: 6, ease: [0.2, 0.85, 0.25, 1] }}
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
          }}
        >
          <defs>
            {prizes.map((item, index) => (
              <linearGradient
                id={`grad-${index}`}
                key={index}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={item.color1} />
                <stop offset="100%" stopColor={item.color2} />
              </linearGradient>
            ))}
          </defs>

          {/* Slices Rendering */}
          {prizes.map((item, index) => {
            const start = index * slice;
            const end = start + slice;
            return (
              <path
                key={index}
                d={describeSlice(start, end)}
                fill={`url(#grad-${index})`}
                stroke="#0f052d"
                strokeWidth="3"
                style={{ cursor: "pointer" }}
              />
            );
          })}

          {/* Labels & Emojis */}
          {prizes.map((item, index) => {
            const angle = index * slice + slice / 2;
            const radius = 150; // Jarak teks dari titik pusat
            const pos = polarToCartesian(CENTER, CENTER, radius, angle);

            return (
              <g
                key={index}
                transform={`translate(${pos.x},${pos.y}) rotate(${angle})`}
              >
                <text
                  textAnchor="middle"
                  y="-10"
                  fontSize="26"
                  style={{ userSelect: "none" }}
                >
                  {item.emoji}
                </text>
                <text
                  textAnchor="middle"
                  y="18"
                  fill="#ffffff"
                  fontSize="12.5"
                  fontWeight="800"
                  style={{
                    letterSpacing: "0.05em",
                    textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                    userSelect: "none",
                  }}
                >
                  {item.title.toUpperCase()}
                </text>
              </g>
            );
          })}
        </motion.svg>

        {/* Tombol Putar Terintegrasi di Pusat Lingkaran */}
        <motion.button
          onClick={spin}
          disabled={spinning}
          whileHover={{ scale: spinning ? 1 : 1.08 }}
          whileTap={{ scale: spinning ? 1 : 0.93 }}
          style={{
            position: "absolute",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ffffff 0%, #f472b6 100%)",
            border: "6px solid #0f052d",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.8)",
            color: "#0f052d",
            fontWeight: 800,
            fontSize: "0.9rem",
            letterSpacing: "0.02em",
            cursor: spinning ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 35,
          }}
        >
          {spinning ? "⚡" : "PUTAR"}
        </motion.button>
      </div>

      {/* Dialog Result Pop-up Modals */}
      <AnimatePresence>
        {selected !== null && (
          <>
            {/* Backdrop Blur Gelap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(3, 1, 12, 0.75)",
                backdropFilter: "blur(8px)",
                zIndex: 90,
              }}
            />

            {/* Custom Interactive Particle Confetti */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 100,
              }}
            >
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: -50,
                    x: Math.random() * window.innerWidth,
                    opacity: 1,
                    scale: Math.random() * 0.6 + 0.4,
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    x: `calc(${Math.random() * 100}vw)`,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2.5,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                    background: [
                      (item) => item.color1,
                      "#fff",
                      "#f472b6",
                      "#fbbf24",
                    ][Math.floor(Math.random() * 4)],
                  }}
                />
              ))}
            </div>

            {/* Modal Box Result Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(90%, 480px)",
                zIndex: 150,
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "28px",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${prizes[selected].color1}20`,
                }}
              >
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ fontSize: "4.5rem", marginBottom: "1rem" }}
                >
                  {prizes[selected].emoji}
                </motion.div>

                <h2
                  style={{
                    color: "#fff",
                    fontSize: "2rem",
                    fontWeight: 800,
                    margin: "0 0 1rem 0",
                  }}
                >
                  {prizes[selected].title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    margin: "0 0 2rem 0",
                    fontWeight: 400,
                  }}
                >
                  {prizes[selected].message}
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onNext}
                  style={{
                    width: "100%",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    border: "none",
                    background: `linear-gradient(135deg, ${prizes[selected].color1} 0%, ${prizes[selected].color2} 100%)`,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    boxShadow: `0 10px 25px ${prizes[selected].color2}40`,
                  }}
                >
                  Lanjut Temani Aku ❤️
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
