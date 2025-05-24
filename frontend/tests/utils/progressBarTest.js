import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import { calculatPercentageProgress } from "../../scripts/utils/progressBar.js";

describe("Test suit: tracking.js", () => {
  it("calculates correct time diffs", () => {
    const currentTime = dayjs();
    const currentTimeString = currentTime.toISOString();
    const orderTimeString = currentTime.subtract(5, "days").toISOString();
    const deliveryTimeString = currentTime.add(5, "days").toISOString();

    expect(
      calculatPercentageProgress(
        currentTimeString,
        orderTimeString,
        deliveryTimeString
      )
    ).toEqual(0.5);
  });
});
