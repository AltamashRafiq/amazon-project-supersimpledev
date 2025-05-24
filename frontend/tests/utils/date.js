import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { stringISOToDayJS } from "../../scripts/utils/date.js";

describe("Test suite: utils/date.js", () => {
  it("converts string date to dayjs", () => {
    expect(dayjs.isDayjs(stringISOToDayJS("2024-02-27T20:57:02.235Z"))).toBe(
      true
    );
  });
});
