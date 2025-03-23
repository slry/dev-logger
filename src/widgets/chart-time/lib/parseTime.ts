export const parseMsToTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor(((time % 3600000) % 60000) / 1000);

  return `${hours}:${minutes}:${seconds}`;
};
