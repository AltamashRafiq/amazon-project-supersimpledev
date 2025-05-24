import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import { stringISOToDayJS } from "./date.js";

export function calculatPercentageProgress(
  currentTimeString,
  orderTimeString,
  deliveryTimeString
) {
  const currentTime = stringISOToDayJS(currentTimeString);
  const orderTime = stringISOToDayJS(orderTimeString);
  const deliveryTime = stringISOToDayJS(deliveryTimeString);

  return currentTime.diff(orderTime) / deliveryTime.diff(orderTime);
}
