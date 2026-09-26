import { describe, expect, it } from "vitest";

import { loadRuntimeConfig } from "../src/config.js";

describe("loadRuntimeConfig", () => {
  it("requires a supported catalog environment", () => {
    expect(() => loadRuntimeConfig({})).toThrow(
      "CATALOG_ENV is required and must be development, staging, or production."
    );
  });

  it("uses the default port for a valid environment", () => {
    expect(loadRuntimeConfig({ CATALOG_ENV: "development" })).toEqual({
      catalogEnvironment: "development",
      port: 3000
    });
  });

  it("rejects an invalid port", () => {
    expect(() =>
      loadRuntimeConfig({ CATALOG_ENV: "staging", PORT: "70000" })
    ).toThrow("PORT must be an integer between 1 and 65535.");
  });
});
