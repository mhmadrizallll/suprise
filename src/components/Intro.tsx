import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "Hai, Sekar. 🌼",
  "",
  "Mungkin ada banyak cara orang lain mengucapkan selamat ulang tahun.",
  "Kalopun aku bisa jadi salah satunya, aku hanya bisa memberikan sesuatu seperti ini.",
  "",
  "Bukan hadiah yang mahal.",
  "Bukan juga sesuatu yang sempurna.",
  "",
  "Hanya sebuah cerita kecil...",
  "Yang bisa aku buat",
];

export default function Intro({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index < lines.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2200);

      return () => clearTimeout(timer);
    }

    const btn = setTimeout(() => {
      setShowButton(true);
    }, 1200);

    return () => clearTimeout(btn);
  }, [index]);

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #0f0c29, #1a093e, #05010d)",
        padding: "20px 15px", // Tambahan padding biar konten ga nempel layar HP
        boxSizing: "border-box",
      }}
    >
      {/* GLOBAL RESPONSIVE STYLES (Injected via style tag for simplicity) */}
      <style>{`
        .intro-title { font-size: clamp(32px, 8vw, 48px); margin-bottom: 30px; }
        .intro-text-normal { font-size: clamp(16px, 5vw, 24px); }
        .intro-text-highlight { font-size: clamp(20px, 6vw, 30px); }
        .intro-content { max-width: 600px; width: 100%; padding: 10px; margin-bottom: 60px; }
        .moon-element { top: 40px; right: 10%; font-size: clamp(50px, 12vw, 90px); }
        .heart-main { width: clamp(120px, 25vw, 180px); margin: 0 auto 20px; }
        .footer-text { bottom: 20px; font-size: clamp(11px, 3.5vw, 13px); width: 100%; }
      `}</style>

      {/* AURORA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(236,72,153,.18), transparent 35%),
            radial-gradient(circle at 80% 30%, rgba(168,85,247,.18), transparent 35%),
            radial-gradient(circle at 50% 80%, rgba(59,130,246,.12), transparent 35%)
          `,
          filter: "blur(80px)",
        }}
      />

      {/* STARS */}
      {[...Array(60)].map(
        (
          _,
          i, // Dikurangi jadi 60 agar HP tidak lag/patah-patah
        ) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: "white",
              fontSize: Math.random() * 6 + 2, // Diperkecil sedikit untk HP
              pointerEvents: "none",
            }}
          >
            ✦
          </motion.div>
        ),
      )}

      {/* FLOATING HEARTS */}
      {[...Array(12)].map(
        (
          _,
          i, // Dikurangi dari 20 ke 12 biar HP ga overheat/lag
        ) => (
          <motion.div
            key={`heart-${i}`}
            initial={{
              y: "120vh",
              opacity: 0,
            }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.8, 0],
              x: [0, 15, -15, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              fontSize: 10 + Math.random() * 12,
              color: "#f9a8d4",
              pointerEvents: "none",
            }}
          >
            ♥
          </motion.div>
        ),
      )}

      {/* SHOOTING STAR */}
      <motion.div
        animate={{
          x: [-300, 1200],
          y: [0, 400],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 8,
        }}
        style={{
          position: "absolute",
          top: 80,
          left: -200,
          width: 120, // Diperpendek sedikit agar pas di rasio HP
          height: 2,
          background: "linear-gradient(to right, white, transparent)",
          transform: "rotate(25deg)",
        }}
      />

      {/* MOON */}
      <motion.div
        className="moon-element"
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          filter: "drop-shadow(0 0 20px rgba(255,255,255,.5))",
        }}
      >
        🌙
      </motion.div>

      {/* GLOW BACKGROUND CENTER */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "80vw", // Menggunakan viewport width dibanding fixed px
          height: "80vw",
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: "50%",
          background: "#ec4899",
          filter: "blur(100px)",
        }}
      />

      {/* CONTENT */}
      <div
        className="intro-content"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <motion.img
          src="/assets/glow-heart.png"
          className="heart-main"
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            y: {
              duration: 4,
              repeat: Infinity,
            },
          }}
          style={{
            display: "block",
            filter: `
              drop-shadow(0 0 15px rgba(255,105,180,.5))
              drop-shadow(0 0 30px rgba(255,105,180,.35))
            `,
          }}
        />

        {/* <h1
          className="intro-title"
          style={{
            color: "white",
            fontWeight: 300,
          }}
        >
          Untuk Kamu
        </h1> */}

        <div
          style={{
            minHeight: "auto", // Menggunakan auto agar fleksibel di layar pendek/HP lipat
            marginBottom: 30,
          }}
        >
          <AnimatePresence>
            {lines.slice(0, index).map((line, i) => (
              <motion.p
                key={i}
                initial={{
                  opacity: 0,
                  y: 20,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                }}
                className={
                  i >= 4 ? "intro-text-highlight" : "intro-text-normal"
                }
                style={{
                  color: "rgba(255,255,255,.92)",
                  lineHeight: 1.6,
                  marginBottom: 12,
                  fontWeight: i >= 4 ? 500 : 300,
                }}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={onNext}
              style={{
                padding: "14px 32px", // Sedikit diperkecil untuk jempol pengguna HP
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.12)",
                background: "linear-gradient(135deg,#ec4899,#f472b6)",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(236,72,153,.45)",
              }}
            >
              Lanjut ❤️
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <motion.div
        className="footer-text"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          color: "rgba(255,255,255,.45)",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        dibuat dengan sedikit waktu
        <br />
        sedikit usaha
        <br />
        dan banyak niat ❤️
      </motion.div>
    </div>
  );
}
