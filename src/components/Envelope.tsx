"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

type Props = {
  content: string;
  onNext: () => void;
};

export default function Envelope({ content, onNext }: Props) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const openAudio = useRef<HTMLAudioElement | null>(null);
  const paperAudio = useRef<HTMLAudioElement | null>(null);
  const pianoAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    openAudio.current = new Audio("/sounds/envelope-open.mp3");

    paperAudio.current = new Audio("/sounds/paper.mp3");

    pianoAudio.current = new Audio("/sounds/love-piano.mp3");

    pianoAudio.current.volume = 0.3;

    return () => {
      pianoAudio.current?.pause();
    };
  }, []);

  const openEnvelope = () => {
    if (opened) return;

    setOpened(true);

    openAudio.current?.play();

    setTimeout(() => {
      paperAudio.current?.play();
    }, 600);

    setTimeout(() => {
      setShowLetter(true);

      pianoAudio.current?.play().catch(() => {});
    }, 900);
  };

  return (
    <>
      {/* Floating Glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[100px]" />

      {/* Envelope */}
      {!showLetter && (
        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={openEnvelope}
            className="cursor-pointer"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative h-[240px] w-[360px]"
            >
              {/* Letter */}
              <motion.div
                animate={{
                  y: opened ? -140 : 40,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-5 right-5 z-[1] h-[220px] rounded-2xl bg-gradient-to-b from-white to-rose-50 shadow-2xl"
              />

              {/* Body */}
              <div className="absolute inset-0 z-[2] rounded-3xl bg-gradient-to-br from-amber-100 to-yellow-200 shadow-[0_20px_60px_rgba(0,0,0,.3)]" />

              {/* Flap */}
              <motion.div
                animate={{
                  rotateX: opened ? 180 : 0,
                }}
                transition={{
                  duration: 1,
                }}
                className="absolute left-0 right-0 top-0 z-[4] h-[55%]"
                style={{
                  clipPath: "polygon(0 0,100% 0,50% 100%)",
                  background: "linear-gradient(135deg,#f7dfb2,#e7c57f)",
                  transformOrigin: "top",
                }}
              />

              {/* Seal */}
              {!opened && (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute left-1/2 top-[40%] z-[5] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-2xl shadow-[0_0_30px_rgba(236,72,153,.5)]"
                >
                  ❤️
                </motion.div>
              )}
            </motion.div>

            <p className="mt-8 text-center text-white/70">
              Click the envelope 💌
            </p>
          </motion.div>
        </div>
      )}

      {/* Letter Modal */}
      <AnimatePresence>
        {showLetter && (
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{
                y: 80,
                scale: 0.9,
              }}
              animate={{
                y: 0,
                scale: 1,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[40px]"
            >
              {/* Paper */}
              <div
                className="relative p-10 md:p-14"
                style={{
                  background: "linear-gradient(180deg,#fffdf7,#f5e9d7)",
                }}
              >
                {/* Watermark */}
                <div className="absolute bottom-4 right-6 text-[140px] opacity-[0.04]">
                  ❤️
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="mb-6 text-center text-5xl"
                  >
                    💌
                  </motion.div>

                  <h2 className="mb-8 text-center text-4xl font-light text-rose-500">
                    Written Especially For You
                  </h2>

                  <div className="min-h-[320px] text-[20px] leading-[1.8] text-slate-700">
                    <TypeAnimation
                      sequence={[
                        content,
                        () => {
                          setShowNext(true);
                        },
                      ]}
                      speed={70}
                      cursor={true}
                      repeat={0}
                      style={{
                        whiteSpace: "pre-line",
                      }}
                    />
                  </div>

                  <AnimatePresence>
                    {showNext && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="mt-12 text-center"
                      >
                        <p className="mb-6 italic text-rose-500">
                          made with ❤️
                        </p>

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() => {
                            pianoAudio.current?.pause();
                            onNext();
                          }}
                          className="rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-10 py-4 font-medium text-white shadow-[0_0_40px_rgba(236,72,153,.4)]"
                        >
                          Continue ✨
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
