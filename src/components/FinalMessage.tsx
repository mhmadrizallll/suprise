import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Song = {
  title: string;
  artist: string;
  duration: number;
  cover: string;
  src: string;
};

const songs: Song[] = [
  {
    title: "Cintanya Aku",
    artist: "Tiara Andini & Arsy Widianto",
    duration: 215,
    cover: "/assets/song1.jpg",
    src: "/music/cintanya.mp3",
  },
  {
    title: "Blue",
    artist: "Yung Kai",
    duration: 172,
    cover: "/assets/song2.jpg",
    src: "/music/blue.mp3",
  },
  {
    title: "Langit Favorit feat. Ghazi Alhabsyi",
    artist: "Luthfi Aulia",
    duration: 226,
    cover: "/assets/song3.jpg",
    src: "/music/langit.mp3",
  },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);

  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function FinalMessage({ onFinish }: { onFinish: () => void }) {
  const [scene, setScene] = useState(0);

  const [selectedSong, setSelectedSong] = useState<number | null>(null);

  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene(1);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const interval = setInterval(() => {
      if (!audioRef.current) return;

      setProgress(audioRef.current.currentTime);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    [],
  );

  const chooseSong = (index: number) => {
    setSelectedSong(index);

    audioRef.current = new Audio(songs[index].src);

    audioRef.current.volume = 0.75;

    audioRef.current.play();

    setPlaying(true);

    audioRef.current.onended = () => {
      setPlaying(false);

      setTimeout(() => {
        onFinish();
      }, 2500);
    };

    setScene(2);
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
        background:
          "radial-gradient(circle at top,#41295a 0%,#2F0743 40%,#080510 100%)",
        padding: 30,
      }}
    >
      {/* Aurora */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle,#EC4899,transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Floating Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.25, 1, 0.25],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
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

      {/* Floating Hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: 18,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          position: "relative",
          zIndex: 5,
          textAlign: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {scene === 0 && (
            <motion.div
              key="intro"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
            >
              <motion.h1
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  color: "white",
                  fontSize: 54,
                  marginBottom: 24,
                }}
              >
                One Last Thing...
              </motion.h1>

              <p
                style={{
                  color: "rgba(255,255,255,.78)",
                  fontSize: 20,
                  lineHeight: 2,
                }}
              >
                Kalau kamu sudah sampai di sini, <br /> berarti kamu sudah
                melihat semua yang ingin kubersiapkan walaupun tidak terlalu
                menarik
              </p>
            </motion.div>
          )}

          {/* Scene berikutnya di Part 2 */}

          {scene === 1 && (
            <motion.div
              key="choose-song"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: "white",
                  fontSize: 44,
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                🎵 Satu Lagu Terakhir
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                style={{
                  color: "rgba(255,255,255,.75)",
                  fontSize: 18,
                  lineHeight: 1.9,
                  marginBottom: 45,
                }}
              >
                Setiap kenangan rasanya selalu punya lagu.
                <br />
                Kalau boleh, pilih satu lagu yang ingin menemani beberapa menit
                terakhir di sini.
              </motion.p>

              <div
                style={{
                  display: "grid",
                  gap: 22,
                  maxWidth: 720,
                  margin: "0 auto",
                }}
              >
                {songs.map((song, index) => (
                  <motion.div
                    key={song.title}
                    whileHover={{
                      scale: 1.02,
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => chooseSong(index)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 22,
                      padding: 22,
                      borderRadius: 24,
                      background: "rgba(255,255,255,.08)",
                      backdropFilter: "blur(18px)",
                      border: "1px solid rgba(255,255,255,.12)",
                      transition: ".3s",
                    }}
                  >
                    {/* Album Cover */}
                    <motion.div
                      whileHover={{
                        rotate: -4,
                        scale: 1.05,
                      }}
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 20,
                        overflow: "hidden",
                        background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 34,
                        boxShadow: "0 10px 25px rgba(236,72,153,.35)",
                        flexShrink: 0,
                      }}
                    >
                      {song.cover ? (
                        <img
                          src={song.cover}
                          alt={song.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "🎵"
                      )}
                    </motion.div>

                    {/* Song Info */}
                    <div
                      style={{
                        flex: 1,
                        textAlign: "left",
                      }}
                    >
                      <h3
                        style={{
                          color: "white",
                          margin: 0,
                          fontSize: 22,
                          fontWeight: 700,
                        }}
                      >
                        {song.title}
                      </h3>

                      <p
                        style={{
                          marginTop: 8,
                          marginBottom: 12,
                          color: "rgba(255,255,255,.65)",
                          fontSize: 16,
                        }}
                      >
                        {song.artist}
                      </p>

                      <div
                        style={{
                          width: "100%",
                          height: 5,
                          borderRadius: 999,
                          background: "rgba(255,255,255,.12)",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          animate={{
                            width: ["0%", "100%", "0%"],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                          style={{
                            height: "100%",
                            background:
                              "linear-gradient(90deg,#ec4899,#f472b6)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Play Button */}
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#ec4899,#f472b6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: 26,
                        boxShadow: "0 10px 30px rgba(236,72,153,.4)",
                        flexShrink: 0,
                      }}
                    >
                      ▶
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                style={{
                  marginTop: 35,
                  color: "rgba(255,255,255,.55)",
                  letterSpacing: 1,
                }}
              >
                pilih salah satu lagu untuk memulai ending ❤️
              </motion.p>
            </motion.div>
          )}

          {/* Now Playing dibuat di Part 3 */}
          {scene === 2 && selectedSong !== null && (
            <motion.div
              key="player"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: "white",
                  fontSize: 42,
                  marginBottom: 35,
                }}
              >
                🎧 Semoga Kamu Menyukainya
              </motion.h2>

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(236,72,153,.25)",
                    "0 0 60px rgba(236,72,153,.55)",
                    "0 0 20px rgba(236,72,153,.25)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  width: "100%",
                  maxWidth: 700,
                  margin: "0 auto",
                  borderRadius: 30,
                  background: "rgba(255,255,255,.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,.12)",
                  padding: 35,
                }}
              >
                <motion.div
                  animate={{
                    rotate: playing ? 360 : 0,
                  }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{
                    width: 220,
                    height: 220,
                    margin: "0 auto",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 80,
                    boxShadow: "0 20px 45px rgba(236,72,153,.35)",
                  }}
                >
                  💿
                </motion.div>

                <h2
                  style={{
                    color: "white",
                    marginTop: 35,
                    marginBottom: 10,
                    fontSize: 34,
                  }}
                >
                  {songs[selectedSong].title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.7)",
                    marginBottom: 35,
                    fontSize: 18,
                  }}
                >
                  {songs[selectedSong].artist}
                </p>

                {/* Progress */}
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(255,255,255,.12)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    animate={{
                      width: `${
                        (progress / songs[selectedSong].duration) * 100
                      }%`,
                    }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg,#ec4899,#f472b6)",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                    color: "rgba(255,255,255,.65)",
                    fontSize: 14,
                  }}
                >
                  <span>{formatTime(progress)}</span>

                  <span>{formatTime(songs[selectedSong].duration)}</span>
                </div>

                {/* Controls */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 18,
                    marginTop: 35,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.08)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 22,
                    }}
                  >
                    ⏮
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#ec4899,#f472b6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 30,
                      boxShadow: "0 10px 30px rgba(236,72,153,.35)",
                    }}
                  >
                    {playing ? "⏸" : "▶"}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.08)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 22,
                    }}
                  >
                    ⏭
                  </motion.div>
                </div>

                {/* Lyrics */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1,
                  }}
                  style={{
                    marginTop: 45,
                    minHeight: 180,
                  }}
                >
                  {[
                    "Terima kasih...sudah meluangkan",
                    "sedikit waktumu untuk membuka semua ini.",
                    "Aku tahu ini mungkin hanya sebuah website sederhana.",

                    "Tapi... setiap bagiannya dibuat dengan sungguh-sungguh.",

                    "Semoga hari ini membawa banyak tawa, banyak bahagia, dan banyak cerita baik.",

                    "Selamat ulang tahun, SEKAR ADELIA NURIAWATI. 🎉🎉🎉",
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
                        delay: index * 1.2,
                      }}
                      style={{
                        color: "rgba(255,255,255,.86)",
                        lineHeight: 1.9,
                        marginBottom: 8,
                        fontSize: 20,
                      }}
                    >
                      {line || <>&nbsp;</>}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Ending */}
          <AnimatePresence>
            {!playing && scene === 2 && selectedSong !== null && (
              <>
                {/* Fade Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 4,
                    delay: 2,
                  }}
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "linear-gradient(to bottom,#080510,#000)",
                    zIndex: 100,
                  }}
                />

                {/* Shooting Star */}
                <motion.div
                  initial={{
                    x: -400,
                    y: -100,
                    opacity: 0,
                  }}
                  animate={{
                    x: window.innerWidth + 400,
                    y: 250,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 3,
                  }}
                  style={{
                    position: "fixed",
                    fontSize: 40,
                    zIndex: 110,
                  }}
                >
                  🌠
                </motion.div>

                {/* Final Text */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 5,
                    duration: 2,
                  }}
                  style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    zIndex: 120,
                    padding: 30,
                  }}
                >
                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 5.5,
                    }}
                    style={{
                      color: "white",
                      fontSize: 58,
                      marginBottom: 25,
                    }}
                  >
                    ❤️
                  </motion.h1>

                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 6,
                    }}
                    style={{
                      color: "white",
                      fontSize: 34,
                      marginBottom: 25,
                    }}
                  >
                    Made with Love
                  </motion.h2>

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 7,
                    }}
                    style={{
                      color: "rgba(255,255,255,.75)",
                      fontSize: 22,
                      lineHeight: 2,
                      maxWidth: 650,
                    }}
                  >
                    Thank you...
                    <br />
                    for spending your time
                    <br />
                    on this little website.
                  </motion.p>

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 10,
                    }}
                    style={{
                      color: "#ffd9ec",
                      fontSize: 24,
                      lineHeight: 2,
                      marginTop: 50,
                    }}
                  >
                    Happy Birthday.
                    <br />
                    I hope today becomes
                    <br />
                    one of your happiest memories.
                  </motion.p>

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 14,
                    }}
                    style={{
                      marginTop: 70,
                    }}
                  >
                    <motion.p
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      style={{
                        color: "white",
                        fontSize: 28,
                        fontWeight: 600,
                        lineHeight: 1.8,
                      }}
                    >
                      This website ends here...
                      <br />
                      Hopefully,
                      <br />
                      our story doesn't.
                    </motion.p>
                  </motion.div>

                  <motion.button
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 18,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={onFinish}
                    style={{
                      marginTop: 60,
                      padding: "16px 42px",
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(135deg,#EC4899,#F472B6)",
                      color: "white",
                      fontSize: 18,
                      fontWeight: 700,
                      boxShadow: "0 15px 35px rgba(236,72,153,.35)",
                    }}
                  >
                    ❤️ Finish
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>
    </div>
  );
}
