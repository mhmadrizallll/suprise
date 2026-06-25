import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const reasons = [
  {
    icon: "🌸",
    title: "Cara Kamu Bercerita",
    text: "Aku suka cara kamu bercerita. Kadang cerita sederhana pun jadi menarik saat datang dari kamu.",
  },
  {
    icon: "✨",
    title: "Energi Positif",
    text: "Entah kenapa, kehadiranmu sering membuat suasana terasa lebih ringan dan menyenangkan.",
  },
  {
    icon: "🦋",
    title: "Hal-Hal Kecil",
    text: "Kamu mungkin tidak sadar, tapi ada banyak hal kecil darimu yang diam-diam membuat orang nyaman.",
  },
  {
    icon: "🌙",
    title: "Keunikanmu",
    text: "Di antara banyak orang, kamu punya cara tersendiri yang membuatmu mudah diingat.",
  },
  {
    icon: "💎",
    title: "Menjadi Dirimu Sendiri",
    text: "Salah satu hal terbaik tentang kamu adalah kamu tetap menjadi dirimu sendiri.",
  },
];

export default function WhyYoureSpecial({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [showEnding, setShowEnding] = useState(false);

  const openReason = (index: number) => {
    if (!opened.includes(index)) {
      setOpened((prev) => [...prev, index]);

      const audio = new Audio("/sounds/crystal.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }

    setActive(index);
  };

  useEffect(() => {
    if (opened.length === reasons.length) {
      setTimeout(() => {
        setShowEnding(true);

        const audio = new Audio("/sounds/magic.mp3");
        audio.volume = 0.6;
        audio.play().catch(() => {});
      }, 1000);
    }
  }, [opened]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(236,72,153,.15), transparent 70%)",
        }}
      />

      {/* STARS */}
      {[...Array(60)].map((_, i) => (
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
            fontSize: Math.random() * 8 + 4,
          }}
        >
          ✦
        </motion.div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1000,
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: "white",
            fontSize: 42,
            marginBottom: 10,
          }}
        >
          ❤️ Why You're Special
        </motion.h2>

        <p
          style={{
            color: "rgba(255,255,255,.7)",
            lineHeight: 1.8,
            marginBottom: 60,
          }}
        >
          Ada beberapa alasan yang membuatmu berbeda.
          <br />
          Klik setiap fragmen hati untuk menemukannya.
        </p>

        {/* CENTER HEART */}
        <div
          style={{
            position: "relative",
            height: 450,
          }}
        >
          <motion.img
            src="/assets/glow-heart.png"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            style={{
              width: 180,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              opacity: 0.25,
            }}
          />

          {reasons.map((item, index) => {
            const positions = [
              { left: "20%", top: "20%" },
              { left: "75%", top: "25%" },
              { left: "18%", top: "70%" },
              { left: "75%", top: "72%" },
              { left: "50%", top: "5%" },
            ];

            return (
              <motion.div
                key={index}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                style={{
                  position: "absolute",
                  left: positions[index].left,
                  top: positions[index].top,
                  transform: "translate(-50%,-50%)",
                }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => openReason(index)}
                  style={{
                    width: 95,
                    height: 95,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.15)",
                    background: opened.includes(index)
                      ? "linear-gradient(135deg,#ec4899,#f472b6)"
                      : "rgba(255,255,255,.08)",
                    backdropFilter: "blur(20px)",
                    color: "white",
                    fontSize: 34,
                    cursor: "pointer",
                    boxShadow: opened.includes(index)
                      ? "0 0 35px rgba(236,72,153,.5)"
                      : "0 0 20px rgba(255,255,255,.08)",
                  }}
                >
                  {item.icon}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 20,
            color: "#f472b6",
          }}
        >
          {opened.length}/{reasons.length} ditemukan
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.8)",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              padding: 20,
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
                border: "1px solid rgba(255,255,255,.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: 50,
                  marginBottom: 20,
                }}
              >
                {reasons[active].icon}
              </div>

              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: 15,
                  fontSize: 26,
                }}
              >
                {reasons[active].title}
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  lineHeight: 1.8,
                  textAlign: "center",
                }}
              >
                {reasons[active].text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENDING */}
      <AnimatePresence>
        {showEnding && (
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
              background: "rgba(0,0,0,.85)",
              backdropFilter: "blur(15px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
              padding: 20,
              textAlign: "center",
            }}
          >
            <motion.img
              src="/assets/glow-heart.png"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={{
                width: 220,
                marginBottom: 30,
              }}
            />

            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              style={{
                color: "white",
                fontSize: 36,
                marginBottom: 20,
              }}
            >
              Dan mungkin...
            </motion.h2>

            <p
              style={{
                color: "rgba(255,255,255,.85)",
                maxWidth: 700,
                lineHeight: 2,
                fontSize: 18,
              }}
            >
              itulah beberapa alasan yang membuatmu berbeda.
              <br />
              Dan mungkin juga alasan kenapa kamu begitu mudah diingat. ❤️
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={onNext}
              style={{
                marginTop: 40,
                padding: "15px 35px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg,#ec4899,#f472b6)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
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
