import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100, // persen
        size: 10 + Math.random() * 20,
        duration: 6 + Math.random() * 4,
        delay: 0,
      };

      setHearts((prev) => [...prev.slice(-20), newHeart]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "100vh",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            scale: 1,
          }}
          transition={{
            duration: heart.duration,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            fontSize: heart.size,
            color: "pink",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
