export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.6;
  audio.play();
};
