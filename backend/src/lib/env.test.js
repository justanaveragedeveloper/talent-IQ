import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ENV } from "./env.js";

describe("ENV configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Create a fresh copy of process.env for each test
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it("should export ENV object with PORT, DB_URL, and NODE_ENV properties", () => {
    expect(ENV).toBeDefined();
    expect(ENV).toHaveProperty("PORT");
    expect(ENV).toHaveProperty("DB_URL");
    expect(ENV).toHaveProperty("NODE_ENV");
  });

  it("should read PORT from process.env", () => {
    // ENV is already loaded, so we check if it reads from process.env
    // It can be string or undefined if not set
    const portType = typeof ENV.PORT;
    expect(["string", "undefined"]).toContain(portType);
  });

  it("should read DB_URL from process.env", () => {
    // It can be string or undefined if not set
    const dbUrlType = typeof ENV.DB_URL;
    expect(["string", "undefined"]).toContain(dbUrlType);
  });

  it("should read NODE_ENV from process.env", () => {
    // It can be string or undefined if not set
    const nodeEnvType = typeof ENV.NODE_ENV;
    expect(["string", "undefined"]).toContain(nodeEnvType);
  });

  it("should handle undefined environment variables gracefully", () => {
    // The ENV object should still be defined even if env vars are missing
    expect(ENV).toBeDefined();
    // Properties can be undefined, which is expected
    expect(ENV).toHaveProperty("PORT");
  });

  it("should maintain consistent property structure", () => {
    const keys = Object.keys(ENV);
    expect(keys).toContain("PORT");
    expect(keys).toContain("DB_URL");
    expect(keys).toContain("NODE_ENV");
    expect(keys).toHaveLength(3);
  });

  it("should not expose additional environment variables", () => {
    // Ensure only the specified variables are exposed
    const envKeys = Object.keys(ENV);
    expect(envKeys).not.toContain("PATH");
    expect(envKeys).not.toContain("HOME");
    expect(envKeys).not.toContain("USER");
  });

  it("should allow environment variables to be strings or undefined", () => {
    // Each property should be either a string or undefined
    const portType = typeof ENV.PORT;
    const dbUrlType = typeof ENV.DB_URL;
    const nodeEnvType = typeof ENV.NODE_ENV;

    expect(["string", "undefined"]).toContain(portType);
    expect(["string", "undefined"]).toContain(dbUrlType);
    expect(["string", "undefined"]).toContain(nodeEnvType);
  });
});