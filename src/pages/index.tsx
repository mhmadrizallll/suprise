import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Scene from "@/components/Scene";
import FloatingHearts from "@/components/FloatingHearts";

import Intro from "@/components/Intro";
import LittleJourney from "@/components/LittleJourney";
import ThingsILike from "@/components/ThingsILike";
import MemoryRoom from "@/components/MemoryRoom";
import SecretLetter from "@/components/SecretLetter";
import BirthdayWish from "@/components/BirthdayWish";
import SurpriseBox from "@/components/SurpriseBox";
import LuckyWheel from "@/components/LuckyWheel";
import FinalMessage from "@/components/FinalMessage";
import BirthdayWrapped from "@/components/BirthdayWrapped";
import WhatsAppInvite from "@/components/WhatsAppInvite";

import { playMusic } from "@/utils/musicEngine";

const TOTAL_STEPS = 8;

export default function Home() {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    const musicMap: Record<number, string> = {
      0: "/music/intro.mp3",
      // 1: "/music/journey.mp3",
      1: "/music/like.mp3",
      2: "/music/memory.mp3",
      3: "/music/letter.mp3",
      4: "/music/birthday.mp3",
      5: "/music/gift.mp3",
      6: "/music/final.mp3",
    };

    const music = musicMap[step];

    if (music) {
      playMusic(music);
    }
  }, [step]);

  return (
    <>
      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <FloatingHearts />
      </div>

      {/* Progress */}
      {/* {step < TOTAL_STEPS && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(500px,80%)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg,#ec4899,#f472b6,#c084fc)",
                transition: "0.6s",
              }}
            />
          </div>

          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
              marginTop: 8,
            }}
          >
            {step + 1} / {TOTAL_STEPS}
          </p>
        </div>
      )} */}

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Scene key="final">
              <FinalMessage onReplay={() => setStep(0)} />
            </Scene>

            // <Scene key="birthday-wrapped">
            //   <BirthdayWrapped onNext={next} />
            // </Scene>
            // <Scene key="final">
            //   <FinalMessage onReplay={() => setStep(0)} />
            // </Scene>
          )}

          {step === 1 && (
            <Scene key="birthday">
              <BirthdayWish onNext={next} />
            </Scene>
          )}

          {step === 2 && (
            // <Scene key="things-like">
            //   <ThingsILike onNext={next} />
            // </Scene>
            <Scene key="memory-room">
              <MemoryRoom onNext={next} />
            </Scene>
          )}

          {step === 3 && (
            <Scene key="letter">
              <SecretLetter onNext={next} />
            </Scene>
          )}

          {step === 4 && (
            <Scene key="lucky-wheel">
              <LuckyWheel onNext={next} />
            </Scene>
          )}

          {step === 5 && (
            // <Scene key="surprise">
            //   <SurpriseBox onNext={next} />
            // </Scene>
            <Scene key="intro">
              <Intro onNext={next} />
            </Scene>
          )}

          {/* {step === 6 && (
          )} */}

          {/* {step === 7 && (
            <Scene key="journey">
              <LittleJourney onNext={next} />              
            </Scene>
          )} */}
        </AnimatePresence>
      </div>
    </>
  );
}
