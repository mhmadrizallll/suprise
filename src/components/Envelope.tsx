import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ScrollText } from "lucide-react";

type Props = {
  content: string;
};

export default function Envelope({ content }: Props) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const openEnvelope = () => {
    if (opened) return;

    setOpened(true);

    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  };

  return (
    <>
      {/* BACKDROP */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(10px)",
              zIndex: 50,
            }}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: 1500,
        }}
      >
        <motion.div
          whileHover={{
            scale: opened ? 1 : 1.03,
            y: opened ? 0 : -5,
          }}
          onClick={openEnvelope}
          style={{
            width: 340,
            height: 220,
            position: "relative",
            cursor: opened ? "default" : "pointer",
          }}
        >
          {/* LETTER */}
          <motion.div
            animate={{
              y: opened ? -130 : 40,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              height: 220,
              background: "linear-gradient(180deg,#fffdf7,#f8f1e5)",
              borderRadius: 16,
              zIndex: 1,
              padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,.25)",
              border: "1px solid rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <ScrollText size={28} />
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 15,
                lineHeight: 1.8,
                color: "#333",
              }}
            >
              {opened ? "Klik surat untuk membaca ✨" : ""}
            </div>
          </motion.div>

          {/* BODY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 18,
              background: "linear-gradient(135deg,#fff8ea,#f0dfbc)",
              zIndex: 2,
              boxShadow: "0 20px 50px rgba(0,0,0,.15)",
            }}
          />

          {/* FLAP */}
          <motion.div
            animate={{
              rotateX: opened ? 180 : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              background: "linear-gradient(135deg,#f8e8c8,#ead6a8)",
              clipPath: "polygon(0 0,100% 0,50% 100%)",
              transformOrigin: "top",
              zIndex: 4,
            }}
          />

          {/* SEAL */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  position: "absolute",
                  left: "50%",
                  top: "40%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#f6d365,#d4af37)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 5,
                  boxShadow: "0 0 25px rgba(212,175,55,.5)",
                }}
              >
                <Sparkles size={24} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LETTER MODAL */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.4,
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              style={{
                width: "100%",
                maxWidth: 650,
                background: "linear-gradient(180deg,#fffdf7,#f7efe1)",
                borderRadius: 30,
                padding: 40,
                boxShadow: "0 30px 80px rgba(0,0,0,.35)",
                color: "#333",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 25,
                }}
              >
                <Sparkles size={30} />
              </div>

              <h2
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Untuk Kamu ✨
              </h2>

              <p
                style={{
                  lineHeight: 2,
                  fontSize: 16,
                  whiteSpace: "pre-line",
                }}
              >
                {content}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <button
                  onClick={() => setShowLetter(false)}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background: "#111",
                    color: "white",
                  }}
                >
                  Tutup Surat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
