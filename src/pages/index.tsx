import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Scene from "@/components/Scene";
import FloatingHearts from "@/components/FloatingHearts";
import CinematicIntro from "@/components/CinematicIntro";

import Opening from "@/components/Opening";
import Timeline from "@/components/Timeline";
import Message from "@/components/Message";
import Quiz from "@/components/Quiz";
import Gift from "@/components/Gift";
import Compliment from "@/components/Compliment";

import { playMusic } from "@/utils/musicEngine";

export default function Home() {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => prev + 1);

  // 🎵 MUSIC SYNC (FIXED)
  useEffect(() => {
    if (step === 0) return; // ❗ intro handle sendiri

    const musicMap: Record<number, string> = {
      1: "/music/opening.mp3",
      2: "/music/timeline.mp3",
      3: "/music/message.mp3",
      4: "/music/quiz.mp3",
      5: "/music/gift.mp3",
      6: "/music/ending.mp3",
    };

    const music = musicMap[step];
    if (music) playMusic(music);
  }, [step]);

  return (
    <>
      {/* 🌌 BACKGROUND (LOW LAYER) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <FloatingHearts />
      </div>

      {/* 🎬 INTRO OVERLAY */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro">
            <CinematicIntro onFinish={() => setStep(1)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧠 MAIN FLOW */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: 20,
          fontFamily: "sans-serif",
        }}
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Scene key="opening">
              <Opening onNext={next} />
            </Scene>
          )}

          {step === 2 && (
            <Scene key="timeline">
              <Timeline onNext={next} />
            </Scene>
          )}

          {step === 3 && (
            <Scene key="message">
              <Message onNext={next} />
            </Scene>
          )}

          {step === 4 && (
            <Scene key="quiz">
              <Quiz onNext={next} />
            </Scene>
          )}

          {step === 5 && (
            <Scene key="gift">
              <Gift onNext={next} />
            </Scene>
          )}

          {step === 6 && (
            <Scene key="compliment">
              <Compliment onNext={next} />
            </Scene>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
