import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./Envelope";

export default function Message({ onNext }: { onNext: () => void }) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [readyNext, setReadyNext] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: 20,
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.08), transparent 60%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 700,
          textAlign: "center",
        }}
      >
        {!showEnvelope && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                fontSize: 48,
                marginBottom: 20,
              }}
            >
              ✨
            </motion.div>

            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              style={{
                color: "white",
                fontSize: 38,
                marginBottom: 20,
              }}
            >
              Ada Satu Hal Lagi...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
              }}
              style={{
                color: "rgba(255,255,255,.7)",
                lineHeight: 1.9,
                fontSize: 17,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Sebelum lanjut, aku ingin kamu membaca sesuatu yang aku simpan
              khusus untuk hari ini.
            </motion.p>

            <motion.button
              onClick={() => setShowEnvelope(true)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              style={{
                marginTop: 40,
                padding: "14px 28px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
              }}
            >
              Buka Surat 💌
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {showEnvelope && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Envelope
                content={`
Selamat ulang tahun 🎂

Aku mungkin bukan orang yang paling pandai merangkai kata.

Tapi aku ingin membuat sesuatu yang bisa membuatmu tersenyum hari ini.

Terima kasih sudah menjadi seseorang yang menyenangkan untuk diajak berbicara, didengarkan, dan diingat.

Semoga hari ini dipenuhi banyak hal baik,
banyak tawa,
dan banyak alasan untuk bahagia.

✨
                `}
              />

              {!readyNext && (
                <motion.button
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 3,
                  }}
                  onClick={() => setReadyNext(true)}
                  style={{
                    marginTop: 30,
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.15)",
                    background: "rgba(255,255,255,.08)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Aku Sudah Membacanya ✨
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {readyNext && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <p
                style={{
                  marginTop: 25,
                  color: "rgba(255,255,255,.7)",
                }}
              >
                Masih ada satu kejutan lagi untukmu...
              </p>

              <motion.button
                onClick={onNext}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                style={{
                  marginTop: 20,
                  padding: "14px 30px",
                  borderRadius: 999,
                  border: "none",
                  background: "white",
                  color: "black",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Lanjutkan ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
