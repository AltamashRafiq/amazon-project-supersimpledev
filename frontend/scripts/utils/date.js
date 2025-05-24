import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function isWeekend(date) {
  const weekends = ["Saturday", "Sunday"];
  let weekendFound = false;
  weekends.forEach((weekend) => {
    if (date.format("dddd") === weekend) {
      weekendFound = true;
    }
  });
  return weekendFound;
}

export function stringISOToDayJS(str) {
  const strDayJS = dayjs(str);
  return strDayJS;
}
