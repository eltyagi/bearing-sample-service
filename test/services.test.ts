import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

describe("service catalog API", () => {
  it("returns a catalog entry and request ID", async () => {
    const response = await request(createApp())
      .get("/api/services/developer-portal")
      .set("x-request-id", "test-request");

    expect(response.status).toBe(200);
    expect(response.headers["x-request-id"]).toBe("test-request");
    expect(response.body).toEqual({
      service: {
        slug: "developer-portal",
        displayName: "Developer Portal",
        owner: "developer-experience",
        tier: "standard"
      }
    });
  });

  it("rejects an invalid service slug", async () => {
    const response = await request(createApp()).get("/api/services/INVALID_slug");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        "Service slugs must contain 2-50 lowercase letters, numbers, or hyphens."
    });
  });

  it("returns not found for an unknown service", async () => {
    const response = await request(createApp()).get(
      "/api/services/unknown-service"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'No catalog entry exists for service "unknown-service".'
    });
  });
});
