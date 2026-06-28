import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letterLines = [
  "Hai kamu, ❤️",
  "",
  "Hari ini banyak orang",
  "yang mengucapkan selamat ulang tahun untukmu.",
  "",
  "Dan aku mungkin...",
  "hanya salah satunya.",
  "",
  "Tapi aku ingin membuat",
  "sesuatu yang sedikit berbeda.",
  "",
  "Karena menurutku...",
  "",
  "kamu pantas mendapatkan",
  "sesuatu yang dibuat khusus.",
  "",
  "Aku tidak tahu",
  "apa yang akan terjadi setelah ini.",
  "",
  "Tapi aku senang",
  "karena pernah mengenalmu.",
  "",
  "Terima kasih",
  "sudah menjadi seseorang",
  "yang menyenangkan untuk diajak berbicara.",
  "",
  "Aku harap hari ini",
  "dipenuhi banyak hal baik.",
  "",
  "Banyak tawa.",
  "Banyak kebahagiaan.",
  "Dan banyak alasan untuk tersenyum.",
  "",
  "Selamat ulang tahun. 🎂",
  "",
  "❤️",
];

export default function SecretLetter({ onNext }: { onNext: () => void }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const [visibleLines, setVisibleLines] = useState(0);
  const [finished, setFinished] = useState(false);

  const openLetter = () => {
    if (opening || opened) return;

    setOpening(true);
    new Audio("/sounds/paper-open.mp3").play().catch(() => {});

    setTimeout(() => {
      setOpened(true);
    }, 1000);
  };

  useEffect(() => {
    if (!opened) return;

    if (visibleLines < letterLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        new Audio("/sounds/type.mp3").play().catch(() => {});
      }, 900);

      return () => clearTimeout(timer);
    }

    const finishTimer = setTimeout(() => {
      setFinished(true);
      new Audio("/sounds/magic.mp3").play().catch(() => {});
    }, 800);

    return () => clearTimeout(finishTimer);
  }, [opened, visibleLines]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px", // Ditambah padding atas-bawah agar saat surat memanjang tidak mepet layar
        backgroundColor: "#111827",
      }}
    >
      {/* BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(236,72,153,.2), transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* FLOATING LIGHT */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: "rgba(255,255,255,.4)",
            fontSize: 8 + Math.random() * 12,
            zIndex: 1,
          }}
        >
          ✦
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope-view"
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -50,
              transition: { duration: 0.5, ease: "backIn" },
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {/* CONTAINER AMPLOB */}
            <motion.div
              animate={{
                scale: opening ? 0.95 : [1, 1.03, 1],
                y: opening ? -15 : 0,
                rotate: opening ? 0 : [-1.5, 1.5, -1.5],
              }}
              transition={{
                duration: opening ? 0.8 : 4,
                repeat: opening ? 0 : Infinity,
                ease: "easeInOut",
              }}
              onClick={openLetter}
              style={{
                width: 230,
                height: 150,
                margin: "0 auto 30px",
                cursor: "pointer",
                position: "relative",
                perspective: "1000px",
              }}
            >
              {/* Tutup Amplop */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{
                  rotateX: opening ? 180 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderLeft: "115px solid transparent",
                  borderRight: "115px solid transparent",
                  borderTop: "75px solid #f3e5c5",
                  transformOrigin: "top center",
                  zIndex: opening ? 1 : 4,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />

              {/* Sisi Belakang Tutup Amplop */}
              {opening && (
                <motion.div
                  initial={{ rotateX: -180, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: -75,
                    left: 0,
                    width: 0,
                    height: 0,
                    borderLeft: "115px solid transparent",
                    borderRight: "115px solid transparent",
                    borderBottom: "75px solid #e2d4b3",
                    transformOrigin: "bottom center",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Body Utama Amplop */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#fdf6e3",
                  borderRadius: 12,
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <motion.div
                  animate={
                    opening
                      ? { scale: 0.8, opacity: 0 }
                      : { scale: [1, 1.1, 1] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  style={{ fontSize: 46 }}
                >
                  ❤️
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                color: "white",
                fontSize: 36,
                fontWeight: 500,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Secret Letter 💌
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                color: "rgba(255,255,255,.75)",
                fontSize: 16,
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              Ada satu hal yang ingin kusampaikan.
              <br />
              Yang mungkin lebih mudah kutulis
              <br />
              daripada kuucapkan.
            </motion.p>

            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                marginTop: 25,
                color: "#f9a8d4",
                fontSize: 13,
                letterSpacing: 2,
                textAlign: "center",
              }}
            >
              klik hati untuk membuka ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter-view"
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 25, stiffness: 100 },
            }}
            style={{
              width: "100%",
              maxWidth: 600,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* SURAT UTAMA */}
            <div
              style={{
                background: "linear-gradient(180deg,#fffdf8,#fdf3e6)",
                borderRadius: 24,
                padding: "40px",
                boxShadow: "0 30px 100px rgba(0,0,0,.45)",
                color: "#222",
                fontFamily: "Georgia, serif",
                height: "auto", // Mengikuti isi konten teks
                overflow: "visible", // Menghilangkan fungsi scroll internal
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: 25,
                  fontSize: 26,
                  color: "#b91c1c",
                }}
              >
                Untuk Kamu ❤️
              </h2>

              {letterLines.slice(0, visibleLines).map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    lineHeight: 1.5,
                    marginBottom: 4,
                    whiteSpace: "pre-line",
                    fontSize: 17, // Diperkecil sedikit agar muat banyak tanpa merusak struktur visual
                  }}
                >
                  {line}
                </motion.p>
              ))}

              {!finished && (
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{
                    marginTop: 15,
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  menulis...
                </motion.div>
              )}
            </div>

            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  marginTop: 25,
                  paddingBottom: 20,
                }}
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ color: "rgba(255,255,255,.7)", fontSize: 15 }}
                >
                  Masih ada satu hal lagi...
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  style={{
                    marginTop: 12,
                    padding: "14px 32px",
                    borderRadius: 999,
                    border: "none",
                    background: "linear-gradient(135deg,#ec4899,#f472b6)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 0 30px rgba(236,72,153,.4)",
                  }}
                >
                  🎂 Make A Wish
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
