import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SurpriseBox({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const openSound = useRef<HTMLAudioElement | null>(null);
  const magicSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    openSound.current = new Audio("/sounds/gift-open.mp3");
    magicSound.current = new Audio("/sounds/magic.mp3");

    if (openSound.current) openSound.current.volume = 0.8;
    if (magicSound.current) magicSound.current.volume = 0.55;
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 12 + 12,
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 5,
      })),
    [],
  );

  const openGift = () => {
    if (opened) return;

    setOpened(true);

    openSound.current?.play().catch(() => {});

    setTimeout(() => {
      setShowLight(true);
    }, 350);

    setTimeout(() => {
      magicSound.current?.play().catch(() => {});
      setShowGift(true);
    }, 1000);

    setTimeout(() => {
      setShowNext(true);
    }, 4300);
  };

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
        background:
          "radial-gradient(circle at top,#4a1b74 0%,#1d0d31 40%,#08040f 100%)",
      }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle,#ff69b4,transparent 70%)",
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
            y: [0, -25, 0],
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
          x: [-400, 1800],
          y: [0, 350],
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
          left: -250,
          fontSize: 30,
        }}
      >
        🌠
      </motion.div>

      <div
        style={{
          width: "100%",
          maxWidth: 760,
          position: "relative",
          zIndex: 10,
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
            fontSize: 46,
            marginBottom: 22,
            fontWeight: 600,
          }}
        >
          🎁 One Last Surprise
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          style={{
            color: "rgba(255,255,255,.8)",
            lineHeight: 2,
            fontSize: 18,
            marginBottom: 70,
          }}
        >
          Perjalanan ini hampir selesai.
          <br />
          Tapi...
          <br />
          masih ada satu hadiah
          <br />
          yang ingin kuberikan untukmu.
        </motion.p>
        {/* Gift Section */}
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
            delay: 0.8,
          }}
          style={{
            position: "relative",
            width: 320,
            height: 340,
            margin: "0 auto",
          }}
        >
          {/* Gift Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              inset: 35,
              borderRadius: "50%",
              background: "radial-gradient(circle,#ff5ea8,transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          {/* Floating Gift */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            whileHover={{
              scale: opened ? 1 : 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={openGift}
            style={{
              cursor: opened ? "default" : "pointer",
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Gift Shadow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 180,
                height: 28,
                borderRadius: "50%",
                background: "rgba(0,0,0,.35)",
                filter: "blur(16px)",
              }}
            />

            {/* Box */}
            <div
              style={{
                position: "relative",
                width: 180,
                height: 180,
              }}
            >
              {/* Bottom */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 120,
                  borderRadius: "0 0 18px 18px",
                  background: "linear-gradient(180deg,#ff6fb5,#ec4899)",
                  boxShadow: "0 20px 40px rgba(236,72,153,.35)",
                }}
              />

              {/* Vertical Ribbon */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 26,
                  height: 180,
                  background: "linear-gradient(#ffe28a,#ffc93c)",
                  zIndex: 3,
                }}
              />

              {/* Horizontal Ribbon */}
              <div
                style={{
                  position: "absolute",
                  top: 58,
                  width: "100%",
                  height: 24,
                  background: "linear-gradient(#ffe28a,#ffc93c)",
                  zIndex: 3,
                }}
              />

              {/* Lid */}
              <motion.div
                animate={
                  opened
                    ? {
                        rotate: -24,
                        y: -90,
                        x: -12,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.8,
                  type: "spring",
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: -8,
                  width: 196,
                  height: 55,
                  borderRadius: 14,
                  transformOrigin: "left bottom",
                  background: "linear-gradient(180deg,#ff85c2,#f472b6)",
                  boxShadow: "0 12px 30px rgba(0,0,0,.25)",
                  zIndex: 10,
                }}
              >
                {/* Ribbon */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 26,
                    height: "100%",
                    background: "linear-gradient(#ffe28a,#ffc93c)",
                  }}
                />

                {/* Bow */}
                <motion.div
                  animate={{
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -18,
                    transform: "translateX(-50%)",
                    fontSize: 42,
                  }}
                >
                  🎀
                </motion.div>
              </motion.div>

              {/* Magical Light */}
              <AnimatePresence>
                {showLight && (
                  <>
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.3,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.3],
                        scale: [0.3, 1.8, 2.3],
                      }}
                      transition={{
                        duration: 1.2,
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 35,
                        transform: "translateX(-50%)",
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle,#fff,#ffd7ef,#ff7cc2,transparent)",
                        filter: "blur(20px)",
                        zIndex: 2,
                      }}
                    />

                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.4, 0],
                          x: Math.cos((i / 16) * Math.PI * 2) * 120,
                          y: Math.sin((i / 16) * Math.PI * 2) * 120,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.03,
                        }}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: 60,
                          transform: "translate(-50%,-50%)",
                          color: "#fff",
                          fontSize: 18,
                          zIndex: 20,
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {!opened && (
            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                marginTop: 35,
                color: "#ffd8ef",
                letterSpacing: 2,
                fontSize: 15,
              }}
            >
              klik hadiah untuk membukanya 🎁
            </motion.p>
          )}

          {/* Confetti */}
          <AnimatePresence>
            {showGift &&
              Array.from({ length: 80 }).map((_, i) => {
                const colors = [
                  "#FFD166",
                  "#EC4899",
                  "#F472B6",
                  "#FFFFFF",
                  "#A855F7",
                ];

                return (
                  <motion.div
                    key={i}
                    initial={{
                      y: -100,
                      opacity: 0,
                      x: 0,
                      rotate: 0,
                    }}
                    animate={{
                      y: 900,
                      opacity: [0, 1, 1, 0],
                      x: Math.random() * 500 - 250,
                      rotate: Math.random() * 720,
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 0.4,
                    }}
                    style={{
                      position: "fixed",
                      left: `${Math.random() * 100}%`,
                      top: -40,
                      width: 10,
                      height: 20,
                      borderRadius: 3,
                      background:
                        colors[Math.floor(Math.random() * colors.length)],
                      zIndex: 999,
                    }}
                  />
                );
              })}
          </AnimatePresence>

          {/* Gift Content */}
          <AnimatePresence>
            {showGift && (
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
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  style={{
                    fontSize: 90,
                    marginBottom: 20,
                  }}
                >
                  ❤️
                </motion.div>

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
                    textShadow: "0 0 25px rgba(255,180,220,.6)",
                  }}
                >
                  The Real Gift
                </motion.h2>

                <div
                  style={{
                    maxWidth: 600,
                    margin: "0 auto",
                  }}
                >
                  {[
                    "Aku sempat berpikir cukup lama...",
                    "kira-kira hadiah apa yang paling cocok untukmu.",
                    "",
                    "Bunga akan layu.",
                    "Cokelat akan habis.",
                    "Boneka hanya akan menjadi pajangan.",
                    "",
                    "Lalu aku sadar...",
                    "",
                    "Hadiah terbaik bukanlah sebuah benda.",
                    "",
                    "Melainkan sebuah kenangan.",
                    "Sebuah perhatian.",
                    "Dan seseorang yang benar-benar tulus",
                    "ingin melihatmu tersenyum hari ini.",
                    "",
                    "Semoga website kecil ini",
                    "bisa menjadi salah satu alasan",
                    "kamu tersenyum hari ini.",
                    "",
                    "Selamat ulang tahun. ❤️",
                  ].map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.22,
                      }}
                      style={{
                        color: "rgba(255,255,255,.88)",
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

          {/* Next Button */}
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
                  delay: 0.4,
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 45,
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
                    background:
                      "linear-gradient(135deg,#ec4899,#f472b6,#fb7185)",
                    boxShadow: "0 15px 40px rgba(236,72,153,.45)",
                  }}
                >
                  ❤️ One Last Thing
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
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
        </motion.div>{" "}
        {/* <-- INI YANG KURANG */}
      </div>
    </div>
  );
}
