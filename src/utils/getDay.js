export const GetDay = () => {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;
  const DayorNight = isDayTime === true ? "DayLottie" : "NightLottie";
  return DayorNight;
};
