import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const memories = [
  {
    id: 1,
    icon: "/assets/flower.png",
    title: "Hal Kecil",
    text: "Aku mulai mengingat hal-hal kecil yang pernah kamu ceritakan.",
    x: "18%",
    y: "30%",
    sound: "/sounds/flower.mp3",
  },
  {
    id: 2,
    icon: "/assets/coffe.png",
    title: "Tanpa Sadar",
    text: "Ada beberapa notifikasi yang entah kenapa terasa lebih menyenangkan dari yang lain.",
    x: "75%",
    y: "22%",
    sound: "/sounds/star.mp3",
  },
  {
    id: 3,
    icon: "/assets/letter.jpg",
    title: "Cerita",
    text: "Dan ada beberapa orang yang perlahan menjadi spesial tanpa mereka sadari.",
    x: "28%",
    y: "72%",
    sound: "/sounds/paper.mp3",
  },
  {
    id: 4,
    icon: "/assets/gift.jpg",
    title: "Hari Ini",
    text: "Makanya hari ini aku menyiapkan sesuatu kecil ini khusus untukmu.",
    x: "72%",
    y: "68%",
    sound: "/sounds/chime.mp3",
  },
];

export default function LittleJourney({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [active, setActive] = useState<any>(null);

  const handleOpen = (item: any) => {
    if (!opened.includes(item.id)) {
      setOpened((prev) => [...prev, item.id]);
    }

    const audio = new Audio(item.sound);
    audio.volume = 0.6;
    audio.play().catch(() => {});

    setActive(item);
  };

  const completed = opened.length === memories.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* STARS */}
      {[...Array(80)].map((_, i) => (
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
            fontSize: Math.random() * 6 + 3,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* TITLE */}
      <div
        style={{
          textAlign: "center",
          paddingTop: 70,
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 42,
            marginBottom: 15,
          }}
        >
          🌸 Little Journey
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.7)",
          }}
        >
          Temukan semua kenangan yang bersinar malam ini
        </p>

        <p
          style={{
            color: "#ec4899",
            marginTop: 12,
          }}
        >
          {opened.length}/{memories.length}
        </p>
      </div>

      {/* OBJECTS */}
      {memories.map((item, index) => (
        <motion.div
          key={item.id}
          onClick={() => handleOpen(item)}
          animate={{
            y: [0, -12, 0],
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
          }}
        >
          <motion.img
            whileHover={{
              scale: 1.15,
            }}
            whileTap={{
              scale: 0.95,
            }}
            src={item.icon}
            style={{
              width: 90,
              filter: opened.includes(item.id)
                ? "drop-shadow(0 0 25px #ec4899)"
                : "drop-shadow(0 0 15px rgba(255,255,255,.4))",
            }}
          />
        </motion.div>
      ))}

      {/* FINAL HEART */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 3,
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

            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 34,
                maxWidth: 500,
              }}
            >
              Dan semua fragmen itu...
              <br />
              mengarah pada satu orang ❤️
            </motion.h2>

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
              }}
            >
              Lanjut ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.75)",
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
              }}
              animate={{
                scale: 1,
              }}
              style={{
                width: "100%",
                maxWidth: 550,
                padding: 35,
                borderRadius: 30,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                backdropFilter: "blur(20px)",
                textAlign: "center",
              }}
            >
              <img
                src={active.icon}
                style={{
                  width: 90,
                  marginBottom: 20,
                }}
              />

              <h3
                style={{
                  color: "white",
                  marginBottom: 15,
                }}
              >
                {active.title}
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  lineHeight: 1.8,
                }}
              >
                {active.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
