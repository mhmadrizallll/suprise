import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const reasons = [
  {
    icon: "🌼",
    title: "Edelweis",
    text: "Katanya bunga edelweis melambangkan keabadian. Sejak tahu kamu menyukainya, aku mencari tahu tentang bunga tersebut. Dan seolah aku ingin tahu makna dari keabadian yang kamu maksud.",
    x: "18%",
    y: "25%",
  },
  {
    icon: "☕",
    title: "Secangkir Kopi",
    text: "Semoga selalu ada secangkir kopi yang menemanimu, baik saat hari terasa melelahkan maupun ketika semuanya berjalan baik. Karena di setiap aroma kopi yang datang rasanya menenangkan.",
    x: "72%",
    y: "20%",
  },
  {
    icon: "📖",
    title: "Cerita Baru",
    text: "Mungkin aku hanya menebak bahwa kamu menyukai novel romance, aku yakin bahwa hidupmu juga dipenuhi cerita-cerita indah. Tak selalu sempurna, tapi selalu memiliki alasan untuk terus dilanjutkan hingga halaman terakhir.",
    x: "28%",
    y: "65%",
  },
  {
    icon: "🍦",
    title: "Es Krim",
    text: "Ada alasan kenapa manusia menikmati dinginnya es krim, entah saat merayakan sesuatu, melepas penat, atau membuat hari lebih manis. Kalau aku, cukup dengan caraku mengingatmu, hariku sudah otomatis jadi jauh lebih manis.",
    x: "75%",
    y: "70%",
  },
];

export default function ThingsILike({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [showFinal, setShowFinal] = useState(false);

  const openReason = (index: number) => {
    if (!opened.includes(index)) {
      setOpened((prev) => [...prev, index]);

      const audio = new Audio("/sounds/star.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }

    setActive(index);
  };

  useEffect(() => {
    if (opened.length === reasons.length) {
      setTimeout(() => {
        setShowFinal(true);

        const audio = new Audio("/sounds/magic.mp3");
        audio.volume = 0.6;
        audio.play().catch(() => {});
      }, 800);
    }
  }, [opened]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* STARS */}
      {[...Array(90)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: "white",
            fontSize: Math.random() * 8 + 2,
            pointerEvents: "none",
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* HEADER */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: 70,
        }}
      >
        <motion.img
          src="/assets/glow-heart.png"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          style={{
            width: 110,
            marginBottom: 20,
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: 42,
            marginBottom: 12,
          }}
        >
          Little Things That Remind Me of You
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.65)",
          }}
        >
          Sentuh setiap bintang, ada cerita kecil di dalamnya ✨
        </p>

        <p
          style={{
            color: "#ec4899",
            marginTop: 10,
          }}
        >
          {opened.length}/{reasons.length}
        </p>
      </div>

      {/* CONSTELLATION LINE */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <line
          x1="20%"
          y1="28%"
          x2="72%"
          y2="22%"
          stroke="rgba(255,255,255,.15)"
        />
        <line
          x1="72%"
          y1="22%"
          x2="30%"
          y2="66%"
          stroke="rgba(255,255,255,.15)"
        />
        <line
          x1="30%"
          y1="66%"
          x2="75%"
          y2="72%"
          stroke="rgba(255,255,255,.15)"
        />
      </svg>

      {/* STARS */}
      {reasons.map((item, index) => (
        <motion.div
          key={index}
          onClick={() => openReason(index)}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index,
          }}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            style={{
              fontSize: 50,
              filter: opened.includes(index)
                ? "drop-shadow(0 0 25px #ec4899)"
                : "drop-shadow(0 0 15px rgba(255,255,255,.6))",
            }}
          >
            ⭐
          </motion.div>
        </motion.div>
      ))}

      {/* MODAL */}
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
              background: "rgba(0,0,0,.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              zIndex: 999,
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
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
              style={{
                width: "100%",
                maxWidth: 550,
                padding: 35,
                borderRadius: 30,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.08)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 20 }}>
                {reasons[active].icon}
              </div>

              <h3
                style={{
                  color: "white",
                  marginBottom: 15,
                  fontSize: 28,
                }}
              >
                {reasons[active].title}
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  lineHeight: 1.8,
                  fontSize: 17,
                }}
              >
                {reasons[active].text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 500,
            }}
          >
            <motion.img
              src="/assets/glow-heart.png"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                width: 220,
                marginBottom: 25,
                filter: "drop-shadow(0 0 35px rgba(236,72,153,.7))",
              }}
            />

            <h2
              style={{
                color: "white",
                textAlign: "center",
                maxWidth: 600,
                fontSize: 34,
                lineHeight: 1.6,
              }}
            >
              Hal-hal sederhana...
              <br />
              kadang bisa membuat seseorang terlihat begitu istimewa.
            </h2>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={onNext}
              style={{
                marginTop: 35,
                padding: "15px 35px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg,#ec4899,#f472b6)",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Lanjut ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
