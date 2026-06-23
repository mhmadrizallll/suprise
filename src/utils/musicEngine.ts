let currentAudio: HTMLAudioElement | null = null;
let nextAudio: HTMLAudioElement | null = null;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const playMusic = async (src: string) => {
  const FADE_TIME = 800; // ms

  // 🎵 IF FIRST TIME
  if (!currentAudio) {
    currentAudio = new Audio(src);
    currentAudio.volume = 0;
    currentAudio.loop = true;
    currentAudio.play();

    // fade in
    fadeIn(currentAudio, FADE_TIME);
    return;
  }

  // 🎧 PREP NEXT AUDIO
  nextAudio = new Audio(src);
  nextAudio.volume = 0;
  nextAudio.loop = true;
  nextAudio.play();

  // 🔄 CROSSFADE
  fadeOut(currentAudio, FADE_TIME);
  fadeIn(nextAudio, FADE_TIME);

  await sleep(FADE_TIME);

  // cleanup
  currentAudio.pause();
  currentAudio = nextAudio;
  nextAudio = null;
};

const fadeOut = (audio: HTMLAudioElement, duration: number) => {
  const step = 50;
  const fadeStep = audio.volume / (duration / step);

  const interval = setInterval(() => {
    if (audio.volume > fadeStep) {
      audio.volume -= fadeStep;
    } else {
      audio.volume = 0;
      clearInterval(interval);
    }
  }, step);
};

const fadeIn = (audio: HTMLAudioElement, duration: number) => {
  const step = 50;
  const target = 0.5;
  const fadeStep = target / (duration / step);

  const interval = setInterval(() => {
    if (audio.volume < target) {
      audio.volume += fadeStep;
    } else {
      audio.volume = target;
      clearInterval(interval);
    }
  }, step);
};

export const stopMusic = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
};
