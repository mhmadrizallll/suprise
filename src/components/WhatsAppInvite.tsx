import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = {
  from: "me" | "you";
  text: string;
};

export default function WhatsAppEnding({ onNext }: { onNext: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const story = [
    "eh… bentar",
    "kayaknya ini udah sampai akhir ya",
    "dari tadi kamu udah lihat semua itu",
    "aku gak tau kamu ngerasanya gimana",
    "tapi makasih ya udah stay sampai sini",
    "oh iya… satu hal terakhir",
    "kalau suatu saat kamu lagi gak sibuk",
    "dan kamu lagi gak keberatan juga",
    "kalau kita ketemu lagi / ngobrol / jalan",
    "aku gak akan nolak sih",
    "tapi santai aja, gak harus sekarang kok",
  ];

  useEffect(() => {
    if (step < story.length) {
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, { from: "me", text: story[step] }]);
        setStep(step + 1);
      }, 900);

      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [step]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0b141a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui",
        color: "#fff",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "1rem",
          background: "#111b21",
          borderBottom: "1px solid #222",
          fontWeight: 600,
        }}
      >
        chat
      </div>

      {/* CHAT */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              alignSelf: "flex-start",
              maxWidth: "80%",
              padding: "10px 14px",
              borderRadius: "16px 16px 16px 4px",
              background: "#202c33",
              fontSize: "0.95rem",
              lineHeight: 1.4,
            }}
          >
            {msg.text}
          </motion.div>
        ))}

        {/* final choice */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <motion.div
                style={{
                  padding: "10px 14px",
                  borderRadius: "16px",
                  background: "#005c4b",
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                }}
              >
                kalau kamu nanya aku gimana sekarang…
              </motion.div>

              <motion.div
                style={{
                  padding: "10px 14px",
                  borderRadius: "16px",
                  background: "#005c4b",
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                }}
              >
                ya aku senang sih udah bisa ngomong ini semua
              </motion.div>

              <motion.div
                style={{
                  padding: "10px 14px",
                  borderRadius: "16px",
                  background: "#005c4b",
                  alignSelf: "flex-end",
                  maxWidth: "80%",
                }}
              >
                tapi tenang aja, gak ada yang harus kamu jawab kok 🙂
              </motion.div>

              {/* final gentle CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  opacity: 0.7,
                  fontSize: "0.9rem",
                }}
              >
                kalau suatu hari kita ketemu lagi, itu juga gak masalah
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      {done && (
        <div
          style={{
            padding: "1rem",
            background: "#111b21",
            borderTop: "1px solid #222",
          }}
        >
          <button
            onClick={onNext}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "999px",
              border: "none",
              background: "#00a884",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            selesai
          </button>
        </div>
      )}
    </div>
  );
}
