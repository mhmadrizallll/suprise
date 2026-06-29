import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PRIZES = [
  "😊 Happiness",
  "🌸 Health",
  "✨ Luck",
  "💰 Fortune",
  "🎂 Long Life",
  "🌙 Peace",
  "❤️ Love",
  "💌 Someone Special",
];

const COLORS = [
  "#F472B6",
  "#FB7185",
  "#EC4899",
  "#F59E0B",
  "#8B5CF6",
  "#6366F1",
  "#A855F7",
  "#E11D48",
];

export default function LuckyWheel({ onNext }: { onNext: () => void }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [finished, setFinished] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const spinAudio = useRef<HTMLAudioElement | null>(null);
  const magicAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinAudio.current = new Audio("/sounds/spin.mp3");
    magicAudio.current = new Audio("/sounds/magic.mp3");

    spinAudio.current.volume = 0.6;
    magicAudio.current.volume = 0.7;
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 12,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      })),
    [],
  );

  const spin = () => {
    if (spinning || finished) return;

    setSpinning(true);

    spinAudio.current?.play().catch(() => {});

    const slice = 360 / PRIZES.length;

    // berhenti di LOVE
    const target = 6;

    const finalRotation =
      rotation + 360 * 10 + (360 - target * slice - slice / 2);

    setRotation(finalRotation);

    setTimeout(() => {
      magicAudio.current?.play().catch(() => {});
      setFinished(true);
      setShowResult(true);

      setTimeout(() => {
        setShowNext(true);
      }, 3500);
    }, 7200);
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
        padding: 24,
        background:
          "radial-gradient(circle at top,#3c1567 0%,#170a2d 45%,#08040f 100%)",
      }}
    >
      {/* Aurora Layer */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.45, 0.2],
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
          background: "radial-gradient(circle,#ff6db6,transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: "radial-gradient(circle,#7c3aed,transparent 70%)",
          filter: "blur(160px)",
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
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
            boxShadow: "0 0 10px white",
          }}
        />
      ))}

      {/* Hearts */}
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
            pointerEvents: "none",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Shooting Star */}
      <motion.div
        animate={{
          x: [-300, 1800],
          y: [0, 260],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 9,
        }}
        style={{
          position: "absolute",
          top: 90,
          left: -300,
          fontSize: 30,
        }}
      >
        🌠
      </motion.div>

      <div
        style={{
          width: "100%",
          maxWidth: 920,
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
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
            marginBottom: 18,
            fontWeight: 700,
          }}
        >
          🎡 Lucky Wheel of Fate
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
            color: "rgba(255,255,255,.78)",
            fontSize: 19,
            lineHeight: 2,
            marginBottom: 60,
          }}
        >
          Masih ada satu kejutan lagi...
          <br />
          <br />
          Katanya hidup selalu dipenuhi banyak kemungkinan.
          <br />
          Jadi...
          <br />
          mari kita lihat,
          <br />
          hadiah apa yang dipilih semesta untukmu.
        </motion.p>

        {/* Pointer */}
        <motion.div
          animate={
            spinning
              ? {
                  rotate: [0, -18, 0, 18, 0],
                }
              : {}
          }
          transition={{
            duration: 0.12,
            repeat: spinning ? Infinity : 0,
          }}
          style={{
            width: 0,
            height: 0,
            margin: "0 auto -18px",
            borderLeft: "22px solid transparent",
            borderRight: "22px solid transparent",
            borderTop: "40px solid #FFD166",
            filter: "drop-shadow(0 0 12px rgba(255,220,120,.9))",
            position: "relative",
            zIndex: 100,
          }}
        />

        {/* Wheel masuk di Part 2 */}

        <div
          style={{
            position: "relative",
            width: 520,
            height: 520,
            margin: "0 auto",
          }}
        >
          {/* Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background: "radial-gradient(circle,#ff78c8,transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          {/* Outer Ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "linear-gradient(145deg,#ffffff22,#ffffff08)",
              padding: 14,
              boxShadow: "0 0 40px rgba(255,120,190,.35)",
            }}
          >
            <motion.div
              animate={{
                rotate: rotation,
              }}
              transition={{
                duration: 7,
                ease: [0.15, 0.95, 0.18, 1],
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                background: "#ffffff10",
              }}
            >
              <svg width="492" height="492" viewBox="0 0 492 492">
                <g transform="translate(246,246)">
                  {PRIZES.map((item, index) => {
                    const angle = 360 / PRIZES.length;

                    const start = index * angle;
                    const end = start + angle;

                    const r = 246;

                    const x1 = Math.cos(((start - 90) * Math.PI) / 180) * r;

                    const y1 = Math.sin(((start - 90) * Math.PI) / 180) * r;

                    const x2 = Math.cos(((end - 90) * Math.PI) / 180) * r;

                    const y2 = Math.sin(((end - 90) * Math.PI) / 180) * r;

                    return (
                      <g key={index}>
                        <path
                          d={`M0 0 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                          fill={COLORS[index]}
                          stroke="rgba(255,255,255,.28)"
                          strokeWidth="2"
                        />

                        <g
                          transform={`
                          rotate(${start + angle / 2})
                          translate(150 0)
                        `}
                        >
                          <text
                            transform="rotate(90)"
                            fill="white"
                            fontWeight="700"
                            fontSize="18"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              userSelect: "none",
                            }}
                          >
                            {item}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </motion.div>
          </div>

          {/* Glass Reflection */}
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 60,
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "linear-gradient(rgba(255,255,255,.35),transparent)",
              filter: "blur(5px)",
              pointerEvents: "none",
            }}
          />

          {/* Center Hub */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: 115,
              height: 115,
              borderRadius: "50%",
              background: "linear-gradient(145deg,#fff,#ffd7ea)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 42,
              boxShadow: "0 0 40px rgba(255,255,255,.5)",
              zIndex: 20,
            }}
          >
            ❤️
          </motion.div>
        </div>

        {!finished && (
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 45px rgba(255,120,190,.6)",
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={spin}
            disabled={spinning}
            style={{
              marginTop: 45,
              padding: "18px 52px",
              borderRadius: 999,
              border: "none",
              cursor: spinning ? "default" : "pointer",
              fontWeight: 700,
              color: "white",
              fontSize: 20,
              background: "linear-gradient(135deg,#EC4899,#FB7185)",
              boxShadow: "0 15px 45px rgba(236,72,153,.45)",
            }}
          >
            {spinning ? "🎡 Spinning..." : "❤️ SPIN"}
          </motion.button>
        )}

        <AnimatePresence>
          {spinning && !finished && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              style={{
                marginTop: 22,
                color: "#ffd6eb",
                letterSpacing: 2,
                fontSize: 15,
              }}
            >
              ✨ mencari hadiah terbaik...
            </motion.p>
          )}
        </AnimatePresence>

        {/* =========================
            CINEMATIC EFFECT
        ========================== */}

        <AnimatePresence>
          {spinning && !finished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.45, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "52%",
                transform: "translate(-50%,-50%)",
                width: 620,
                height: 620,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(255,255,255,.18),transparent 70%)",
                filter: "blur(35px)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Winner Flash */}

        <AnimatePresence>
          {finished && (
            <>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.2,
                }}
                animate={{
                  opacity: [0, 1, 0.25],
                  scale: [0.2, 2.2, 3],
                }}
                transition={{
                  duration: 1.3,
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "52%",
                  transform: "translate(-50%,-50%)",
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,#fff,#ffd9ef,#ff5ea8,transparent)",
                  filter: "blur(30px)",
                }}
              />

              {Array.from({ length: 45 }).map((_, i) => {
                const angle = (360 / 45) * i;
                const distance = 180 + Math.random() * 130;

                return (
                  <motion.div
                    key={i}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.cos((angle * Math.PI) / 180) * distance,
                      y: Math.sin((angle * Math.PI) / 180) * distance,
                      scale: [0, 1.3, 0.8],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.02,
                    }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "52%",
                      transform: "translate(-50%,-50%)",
                      fontSize: 18 + Math.random() * 10,
                      pointerEvents: "none",
                    }}
                  >
                    ❤️
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Confetti */}

        <AnimatePresence>
          {finished &&
            Array.from({ length: 90 }).map((_, i) => {
              const left = Math.random() * 100;

              return (
                <motion.div
                  key={i}
                  initial={{
                    y: -120,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    y: 900,
                    opacity: [0, 1, 1, 0],
                    rotate: 720,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random(),
                  }}
                  style={{
                    position: "fixed",
                    top: -20,
                    left: `${left}%`,
                    width: 9,
                    height: 18,
                    borderRadius: 3,
                    background: [
                      "#EC4899",
                      "#F472B6",
                      "#FFD166",
                      "#FFFFFF",
                      "#A855F7",
                    ][Math.floor(Math.random() * 5)],
                    zIndex: 999,
                  }}
                />
              );
            })}
        </AnimatePresence>

        {/* RESULT */}

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              style={{
                marginTop: 60,
              }}
            >
              <motion.h2
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  color: "white",
                  fontSize: 42,
                  marginBottom: 25,
                  textShadow: "0 0 30px rgba(255,180,220,.5)",
                }}
              >
                ❤️ LOVE ❤️
              </motion.h2>

              <div
                style={{
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                {[
                  "Selamat...",
                  "",
                  "Wheel memilih hadiah ini.",
                  "",
                  "Love ❤️",
                  "",
                  "Tapi...",
                  "",
                  "menurutku masih ada hadiah",
                  "yang jauh lebih indah.",
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
                      delay: index * 0.18,
                    }}
                    style={{
                      color: "rgba(255,255,255,.88)",
                      lineHeight: 1.9,
                      fontSize: 18,
                      marginBottom: 10,
                    }}
                  >
                    {line || <>&nbsp;</>}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===========================================
        FINAL CINEMATIC REVEAL
=========================================== */}

        <AnimatePresence>
          {showResult && (
            <>
              {/* Fade Wheel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.55],
                }}
                transition={{
                  delay: 3.5,
                  duration: 1,
                }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(5,4,15,.75)",
                  backdropFilter: "blur(12px)",
                  zIndex: 400,
                }}
              />

              {/* Big Glow */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 4.2,
                  duration: 1.2,
                }}
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 600,
                  height: 600,
                  borderRadius: "50%",
                  background: "radial-gradient(circle,#ff7dc5,transparent 70%)",
                  filter: "blur(90px)",
                  zIndex: 401,
                }}
              />

              {/* Heart */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: [0.5, 1.2, 1],
                }}
                transition={{
                  delay: 4.6,
                  duration: 1.2,
                }}
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "38%",
                  transform: "translate(-50%,-50%)",
                  fontSize: 90,
                  zIndex: 402,
                  filter: "drop-shadow(0 0 35px #ff66b4)",
                }}
              >
                ❤️
              </motion.div>

              {/* Text */}
              <div
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "58%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  maxWidth: 700,
                  textAlign: "center",
                  zIndex: 403,
                }}
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 5,
                    duration: 1,
                  }}
                  style={{
                    color: "white",
                    fontSize: 34,
                    marginBottom: 25,
                  }}
                >
                  Actually...
                </motion.h2>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 6,
                    duration: 1,
                  }}
                  style={{
                    color: "#ffd7ef",
                    fontSize: 46,
                    marginBottom: 28,
                    textShadow: "0 0 35px rgba(255,160,220,.65)",
                  }}
                >
                  The real prize...
                </motion.h1>

                <motion.h1
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 7.2,
                    duration: 1,
                  }}
                  style={{
                    color: "white",
                    fontSize: 54,
                    fontWeight: 700,
                    marginBottom: 35,
                    lineHeight: 1.4,
                  }}
                >
                  was meeting you.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 8.3,
                  }}
                  style={{
                    color: "rgba(255,255,255,.82)",
                    lineHeight: 2,
                    fontSize: 19,
                  }}
                >
                  Mungkin roda ini memilih hadiah bernama
                  <br />
                  <strong>Love.</strong>
                  <br />
                  <br />
                  Tapi buatku...
                  <br />
                  hadiah terindah bukan hadiah itu.
                  <br />
                  <br />
                  Melainkan kesempatan
                  <br />
                  untuk mengenal seseorang sebaik kamu.
                </motion.p>

                <AnimatePresence>
                  {showNext && (
                    <motion.button
                      initial={{
                        opacity: 0,
                        y: 35,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      whileHover={{
                        scale: 1.06,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      transition={{
                        delay: 9.5,
                      }}
                      onClick={onNext}
                      style={{
                        marginTop: 55,
                        padding: "18px 52px",
                        borderRadius: 999,
                        border: "none",
                        cursor: "pointer",
                        background: "linear-gradient(135deg,#EC4899,#F472B6)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 19,
                        boxShadow: "0 0 40px rgba(236,72,153,.55)",
                      }}
                    >
                      One Last Thing ❤️
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
