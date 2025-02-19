import { filterClasses } from "./filterClasses";
import { describe, expect, test } from "vitest";

describe("filterClasses", () => {
  test("concatenates classes", () => {
    expect(filterClasses(["px-3 my-2", "text-white p-4"])).toBe(
      "px-3 my-2 text-white p-4"
    );
  });

  test("removes falsy, non-numberic values", () => {
    expect(
      filterClasses(["px-3 my-2", false, "", undefined, "text-white p-4"])
    ).toBe("px-3 my-2 text-white p-4");
  });
});
