import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BirthdayWish({ onNext }: { onNext: () => void }) {
  const [blown, setBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const blowSound = useRef<HTMLAudioElement | null>(null);
  const magicSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    blowSound.current = new Audio("/sounds/blow.mp3");
    magicSound.current = new Audio("/sounds/magic.mp3");

    if (blowSound.current) blowSound.current.volume = 0.8;
    if (magicSound.current) magicSound.current.volume = 0.55;
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 10,
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 5,
      })),
    [],
  );

  const blowCandle = () => {
    if (blown) return;

    setBlown(true);

    blowSound.current?.play().catch(() => {});

    setTimeout(() => {
      magicSound.current?.play().catch(() => {});
      setShowMessage(true);
    }, 1000);

    setTimeout(() => {
      setShowNext(true);
    }, 4500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        background:
          "radial-gradient(circle at top,#3d1a66 0%,#1a0d2e 35%,#0a0615 70%,#05030a 100%)",
      }}
    >
      {/* Layer 1 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle,#ff6fb5,transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 2 */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 950,
          height: 950,
          borderRadius: "50%",
          background: "radial-gradient(circle,#9d4edd,transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
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
            background: "white",
            boxShadow: "0 0 12px white",
          }}
        />
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: heart.size,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Shooting Star */}
      <motion.div
        animate={{
          x: [-400, 1600],
          y: [0, 300],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
        }}
        style={{
          position: "absolute",
          top: 80,
          left: -200,
          fontSize: 28,
        }}
      >
        🌠
      </motion.div>

      <div
        style={{
          width: "100%",
          maxWidth: 760,
          position: "relative",
          zIndex: 20,
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          style={{
            color: "white",
            fontSize: 48,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          🎂 Birthday Wish
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          style={{
            color: "rgba(255,255,255,.78)",
            lineHeight: 2,
            fontSize: 19,
            marginBottom: 50,
          }}
        >
          Sebelum kita membuka hadiah terakhir...
          <br />
          aku ingin meminta satu hal.
          <br />
          <br />
          Tutup matamu sebentar.
          <br />
          Tarik napas perlahan.
          <br />
          Lalu pikirkan satu harapan
          <br />
          yang benar-benar ingin kamu wujudkan.
        </motion.p>
        {/* Cake Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 1,
          }}
          style={{
            position: "relative",
            width: 320,
            height: 320,
            margin: "0 auto",
          }}
        >
          {/* Pink Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              inset: 40,
              borderRadius: "50%",
              background: "radial-gradient(circle,#ff5ea8,transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Floating Cake */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [-1.5, 1.5, -1.5],
              scale: blown ? [1, 1.08, 1] : [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            onClick={blowCandle}
            whileHover={{
              scale: blown ? 1 : 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            style={{
              cursor: blown ? "default" : "pointer",
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Cake */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                position: "relative",
                width: 220,
                height: 180,
              }}
            >
              {/* Shadow */}
              <div
                style={{
                  position: "absolute",
                  bottom: -15,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 180,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,.25)",
                  filter: "blur(12px)",
                }}
              />

              {/* Bottom Cake */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 220,
                  height: 70,
                  borderRadius: "0 0 28px 28px",
                  background: "linear-gradient(180deg,#ff93c9,#ff5fa2)",
                  boxShadow: "0 10px 30px rgba(255,105,180,.35)",
                }}
              />

              {/* Middle Cream */}
              <div
                style={{
                  position: "absolute",
                  bottom: 62,
                  width: 220,
                  height: 18,
                  background: "#fff5fb",
                }}
              />

              {/* Top Cake */}
              <div
                style={{
                  position: "absolute",
                  bottom: 80,
                  width: 180,
                  left: 20,
                  height: 55,
                  borderRadius: "20px 20px 12px 12px",
                  background: "linear-gradient(180deg,#ffc1df,#ff83bb)",
                }}
              />

              {/* Cream */}
              <div
                style={{
                  position: "absolute",
                  bottom: 126,
                  left: 15,
                  right: 15,
                  height: 18,
                  borderRadius: 999,
                  background: "#fffdfd",
                }}
              />

              {/* Cherry */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 140,
                  transform: "translateX(-50%)",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#ff2855",
                  boxShadow: "0 0 15px #ff2855",
                }}
              />

              {/* Sprinkles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 25 + Math.random() * 170,
                    top: 45 + Math.random() * 70,
                    width: 3,
                    height: 9,
                    borderRadius: 2,
                    background: [
                      "#FFD166",
                      "#7DD3FC",
                      "#A7F3D0",
                      "#FFFFFF",
                      "#FB7185",
                    ][Math.floor(Math.random() * 5)],
                    transform: `rotate(${Math.random() * 180}deg)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Candle */}
            <div
              style={{
                position: "absolute",
                top: 58,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 45,
                borderRadius: 10,
                background: "linear-gradient(#ffe08a,#ffb347)",
              }}
            />

            {/* Flame */}
            <AnimatePresence>
              {!blown && (
                <motion.div
                  initial={false}
                  animate={{
                    opacity: blown ? 0 : 1,
                    scale: blown ? 0 : [1, 1.12, 0.96, 1.15, 1],
                    rotate: blown ? 0 : [-4, 3, -2, 4, 0],
                    y: blown ? -10 : [0, -2, 0, -3, 0],
                  }}
                  transition={{
                    duration: blown ? 0.25 : 0.45,
                    repeat: blown ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: -4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 28,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,#fff7b1,#ff9800 65%,transparent)",
                    filter: "blur(.5px)",
                    boxShadow: "0 0 25px #ffcf40,0 0 60px orange",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Smoke */}
            <AnimatePresence>
              {blown && (
                <>
                  <motion.div
                    initial={{
                      opacity: 0.8,
                      scale: 0.3,
                      y: 0,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 2.2,
                      y: -70,
                    }}
                    transition={{
                      duration: 2,
                    }}
                    style={{
                      position: "absolute",
                      top: -2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.7)",
                      filter: "blur(10px)",
                    }}
                  />

                  <motion.div
                    initial={{
                      opacity: 0.5,
                      scale: 0.2,
                      y: 10,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 3,
                      y: -90,
                    }}
                    transition={{
                      duration: 2.5,
                    }}
                    style={{
                      position: "absolute",
                      top: 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 25,
                      height: 25,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.6)",
                      filter: "blur(12px)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Sparkles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.6, 1],
                }}
                transition={{
                  duration: 1.8 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  position: "absolute",
                  left: `${25 + Math.random() * 50}%`,
                  top: `${20 + Math.random() * 55}%`,
                  color: "#ffd4ef",
                  fontSize: 14,
                }}
              >
                ✦
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {!blown && (
          <motion.p
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            style={{
              marginTop: 25,
              color: "#ffd9ec",
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            klik lilinnya ketika harapanmu sudah siap ✨
          </motion.p>
        )}
        {/* Cinematic Pause */}
        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,.18)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
        {/* Confetti */}
        <AnimatePresence>
          {showMessage &&
            Array.from({ length: 80 }).map((_, i) => {
              const left = Math.random() * 100;
              const rotate = Math.random() * 720;

              return (
                <motion.div
                  key={i}
                  initial={{
                    y: -120,
                    opacity: 0,
                    x: 0,
                  }}
                  animate={{
                    y: 900,
                    opacity: [0, 1, 1, 0],
                    x: Math.random() * 400 - 200,
                    rotate,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 0.6,
                  }}
                  style={{
                    position: "fixed",
                    left: `${left}%`,
                    top: -30,
                    width: 10,
                    height: 18,
                    borderRadius: 3,
                    background: [
                      "#FFD166",
                      "#EC4899",
                      "#F472B6",
                      "#FFFFFF",
                      "#A855F7",
                    ][Math.floor(Math.random() * 5)],
                    zIndex: 200,
                  }}
                />
              );
            })}
        </AnimatePresence>
        {/* Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              style={{
                marginTop: 50,
              }}
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.3,
                }}
                style={{
                  color: "white",
                  fontSize: 38,
                  marginBottom: 30,
                  textShadow: "0 0 25px rgba(255,180,220,.5)",
                }}
              >
                ✨ Semoga Harapanmu Terkabul ✨
              </motion.h2>

              <div
                style={{
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                {[
                  "Aku memang tidak tahu...",
                  "harapan apa yang sedang kamu simpan malam ini.",
                  "",
                  "Tapi aku benar-benar berharap...",
                  "semesta sedang sibuk menyiapkan",
                  "sesuatu yang indah untukmu.",
                  "",
                  "Semoga langkahmu selalu dipenuhi kebahagiaan.",
                  "Semoga setiap doa menemukan jalannya.",
                  "Dan semoga senyummu",
                  "selalu punya alasan untuk hadir.",
                  "",
                  "Selamat ulang tahun. ❤️",
                ].map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.35,
                    }}
                    style={{
                      color: "rgba(255,255,255,.86)",
                      lineHeight: 1.9,
                      marginBottom: 10,
                      fontSize: 18,
                    }}
                  >
                    {line || <>&nbsp;</>}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Shooting Star */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{
                x: -600,
                y: -100,
                opacity: 0,
              }}
              animate={{
                x: 1200,
                y: 250,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: 2,
              }}
              style={{
                position: "fixed",
                top: 80,
                left: -300,
                fontSize: 34,
                zIndex: 250,
              }}
            >
              🌠
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bottom Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            bottom: -180,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle,#ff5ea8,transparent 70%)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />{" "}
        {/* Continue Button */}
        <AnimatePresence>
          {showNext && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              style={{
                marginTop: 50,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(255,120,180,.6)",
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={onNext}
                style={{
                  padding: "16px 42px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: 1,
                  background: "linear-gradient(135deg,#ec4899,#f472b6,#fb7185)",
                  boxShadow: "0 15px 40px rgba(236,72,153,.45)",
                }}
              >
                🎁 Buka Kejutan Terakhir
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bottom Text */}
        <motion.p
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            marginTop: 35,
            color: "rgba(255,255,255,.45)",
            fontSize: 13,
            letterSpacing: 3,
          }}
        >
          made with ❤️ just for you
        </motion.p>
      </div>
    </div>
  );
}
