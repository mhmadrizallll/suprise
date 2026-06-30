import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  emoji: string;
  title: string;
  value: string | number;
  description: string;
  gradient: [string, string];
  counter?: boolean;
};

const slides: Slide[] = [
  {
    emoji: "🎉",
    title: "Days Waiting",
    value: 15,
    description: "Sebanyak itu aku menunggu hari ini datang.",
    gradient: ["#ff6cab", "#7366ff"],
    counter: true,
  },
  {
    emoji: "⌨️",
    title: "Lines of Code",
    value: 8642,
    description: "Semua baris ini dibuat hanya untuk satu orang.",
    gradient: ["#4f46e5", "#8b5cf6"],
    counter: true,
  },
  {
    emoji: "☕",
    title: "Hours Spent",
    value: 34,
    description: "Worth every minute ❤️",
    gradient: ["#fb7185", "#f97316"],
    counter: true,
  },
  {
    emoji: "😊",
    title: "Favorite Smile",
    value: "1",
    description: "Semoga hari ini senyum itu muncul lagi.",
    gradient: ["#06b6d4", "#3b82f6"],
  },
  {
    emoji: "❤️",
    title: "Most Used Word",
    value: "Kamu",
    description: "Karena hampir semua halaman ini tentang kamu.",
    gradient: ["#ec4899", "#db2777"],
  },
  {
    emoji: "🏆",
    title: "Achievement",
    value: "Unlocked",
    description: "Birthday Website Completed",
    gradient: ["#f59e0b", "#ef4444"],
  },
  {
    emoji: "💻",
    title: "Repository",
    value: "birthday-for-you",
    description: "Private repository. Public feelings.",
    gradient: ["#0f172a", "#312e81"],
  },
  {
    emoji: "❤️",
    title: "Mission Status",
    value: "Completed",
    description: "Semoga website ini berhasil membuatmu tersenyum.",
    gradient: ["#7c3aed", "#ec4899"],
  },
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function BirthdayWrapped({ onNext }: { onNext: () => void }) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const slide = slides[current];

  // Efek Bintang (Memoized)
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, () => ({
        left: random(0, 100),
        top: random(0, 100),
        size: random(2, 4),
        duration: random(2, 4),
        delay: random(0, 4),
      })),
    [],
  );

  // Efek Hati Terbang (Memoized)
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        left: random(5, 95),
        top: random(20, 80),
        size: random(16, 26),
        duration: random(4, 8),
        delay: random(0, 3),
      })),
    [],
  );

  // Logika Angka Berjalan (Counter)
  useEffect(() => {
    if (!slide.counter) {
      setCount(0);
      return;
    }

    const target = Number(slide.value);
    let start = 0;
    const duration = 1200; // Durasi animasi counter dalam milidetik
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Menggunakan rumus Easing Out agar animasi melambat di akhir angka
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.round(easeOutProgress * target);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [current, slide.counter, slide.value]);

  // Logika Auto-play Slide (5.5 detik per slide)
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5500);

    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      animate={{
        background: `linear-gradient(135deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
      }}
      transition={{ duration: 1 }}
      onClick={nextSlide}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        cursor: "pointer",
        userSelect: "none", // Mencegah teks ter-highlight saat di-tap cepat
      }}
    >
      {/* Aurora Ambient Background */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Stars Layer */}
      {stars.map((star, index) => (
        <motion.div
          key={`star-${index}`}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 8px white",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Hearts Layer */}
      {hearts.map((heart, index) => (
        <motion.div
          key={`heart-${index}`}
          animate={{
            y: [0, -25, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: heart.size,
            pointerEvents: "none",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main Content Wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 500,
        }}
      >
        {/* Progress Bar & Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              width: "100%",
              height: 4,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                height: "100%",
                background: "#ffffff",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            <span>BIRTHDAY WRAPPED 2026</span>
            <span>
              {current + 1} / {slides.length}
            </span>
          </div>
        </motion.div>

        {/* Glassmorphism Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              marginTop: 24,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 28,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "48px 24px",
              minHeight: 460,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            {/* Animasi Khusus Slide Pertama (Intro Pembuka) */}
            {current === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: 20 }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: 2,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  ✨ ONE LAST THING...
                </p>
                <h1
                  style={{
                    color: "#fff",
                    fontSize: 32,
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  Birthday Wrapped
                </h1>
              </motion.div>
            )}

            {/* Emoji */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontSize: 64,
                marginBottom: 16,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))",
              }}
            >
              {slide.emoji}
            </motion.div>

            {/* Title */}
            <h2
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: 700,
                margin: "0 0 12px 0",
              }}
            >
              {slide.title}
            </h2>

            {/* Big Value / Counter */}
            <div
              style={{
                color: "#fff",
                fontSize:
                  typeof slide.value === "number" || slide.value.length < 5
                    ? 68
                    : 38,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1,
                marginBottom: 16,
                wordBreak: "break-word",
              }}
            >
              {slide.counter ? count.toLocaleString() : slide.value}
            </div>

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 16,
                lineHeight: 1.6,
                maxWidth: 340,
                margin: 0,
              }}
            >
              {slide.description}
            </p>

            {/* Action Hint */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                letterSpacing: 2,
              }}
            >
              TAP ANYWHERE TO CONTINUE
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
