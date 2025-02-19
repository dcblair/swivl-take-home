import { describe, expect, test } from "vitest";
import { findVariable, lowercaseFirstLetter } from "./locationsHelpers";

describe("lowercaseFirstLetter", () => {
  test("converts first letter to lowercase", () => {
    expect(lowercaseFirstLetter("Swivl")).toBe("swivl");
  });
});

describe("findVariable", () => {
  test("finds variable based on valid location id", () => {
    const variables = {
      "3": [
        {
          id: 6,
          orgId: 4,
          locationId: 3,
          key: "Name",
          value: "The Barn Storage",
        },
        {
          id: 9,
          orgId: 4,
          locationId: 3,
          key: "Address",
          value: "789 Redwoood Ave, Humboldt, CA 91502",
        },
      ],
      "4": [
        {
          id: 1,
          orgId: 4,
          locationId: null,
          key: "BrandName",
          value: "StorageUSA",
        },
        {
          id: 2,
          orgId: 4,
          locationId: null,
          key: "StoreHours",
          value:
            "Monday - Friday: 9:00 am to 5:00 pm Saturday - Sunday: 10:00 am to 2:00 pm",
        },
      ],
    };
    const variableKey = "Name";
    const id = 3;
    const orgId = 4;
    expect(findVariable(variableKey, variables, id, orgId)).toBe(
      "The Barn Storage"
    );
  });

  test("finds variable based on orgId as locationId is null", () => {
    const variables = {
      "3": [
        {
          id: 6,
          orgId: 4,
          locationId: 3,
          key: "Name",
          value: "The Barn Storage",
        },
        {
          id: 9,
          orgId: 4,
          locationId: 3,
          key: "Address",
          value: "789 Redwoood Ave, Humboldt, CA 91502",
        },
      ],
      "4": [
        {
          id: 1,
          orgId: 4,
          locationId: null,
          key: "BrandName",
          value: "StorageUSA",
        },
        {
          id: 2,
          orgId: 4,
          locationId: null,
          key: "StoreHours",
          value:
            "Monday - Friday: 9:00 am to 5:00 pm Saturday - Sunday: 10:00 am to 2:00 pm",
        },
        {
          id: 12,
          orgId: 4,
          locationId: null,
          key: "PhoneNumber",
          value: "(800) 872-7867",
        },
      ],
    };
    const variableKey = "PhoneNumber";
    const id = 3;
    const orgId = 4;
    expect(findVariable(variableKey, variables, id, orgId)).toBe(
      "(800) 872-7867"
    );
  });
});
