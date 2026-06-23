import confetti from "canvas-confetti";

export const fireConfetti = () => {
  const duration = 1500;
  const end = Date.now() + duration;

  const colors = ["#ffb6c1", "#ffd1dc", "#ffffff", "#ff69b4"];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      startVelocity: 45,
      origin: { x: 0 },
      colors,
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      startVelocity: 45,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
