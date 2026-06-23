let audio: HTMLAudioElement | null = null;

export const playMusic = (src: string) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();
};

export const stopMusic = () => {
  if (audio) {
    audio.pause();
    audio = null;
  }
};
