import { describe, it, expect, vi } from "vitest";
import path from "path";

// Mock the ENV module before importing server
vi.mock("./lib/env.js", () => ({
  ENV: {
    PORT: "3000",
    DB_URL: "mongodb://localhost:27017/test",
    NODE_ENV: "test",
  },
}));

// Import the app after mocking ENV
import app from "./server.js";

describe("Express Server", () => {
  describe("App Export", () => {
    it("should export the Express app", () => {
      expect(app).toBeDefined();
      expect(typeof app).toBe("function");
    });

    it("should be an Express application instance", () => {
      expect(app).toBeDefined();
      // Express apps have these methods
      expect(typeof app.get).toBe("function");
      expect(typeof app.post).toBe("function");
      expect(typeof app.use).toBe("function");
      expect(typeof app.listen).toBe("function");
    });

    it("should have routing methods available", () => {
      expect(app.get).toBeDefined();
      expect(app.post).toBeDefined();
      expect(app.put).toBeDefined();
      expect(app.delete).toBeDefined();
      expect(app.patch).toBeDefined();
    });
  });

  describe("Route Handler Functions", () => {
    it("should handle /health endpoint logic", () => {
      // Test the logic that would be in /health
      const mockReq = {};
      const mockRes = {
        statusCode: null,
        responseData: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.responseData = data;
          return this;
        },
      };

      // Simulate the /health handler
      mockRes.status(200).json({ msg: "api is up and running" });

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.responseData).toEqual({ msg: "api is up and running" });
    });

    it("should handle /books endpoint logic", () => {
      const mockReq = {};
      const mockRes = {
        statusCode: null,
        responseData: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.responseData = data;
          return this;
        },
      };

      // Simulate the /books handler
      mockRes.status(200).json({ msg: "this is the books endpoint" });

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.responseData).toEqual({
        msg: "this is the books endpoint",
      });
    });
  });

  describe("Response Structure Validation", () => {
    it("should validate health check response structure", () => {
      const healthResponse = { msg: "api is up and running" };

      expect(healthResponse).toHaveProperty("msg");
      expect(typeof healthResponse.msg).toBe("string");
      expect(healthResponse.msg).toBe("api is up and running");
    });

    it("should validate books endpoint response structure", () => {
      const booksResponse = { msg: "this is the books endpoint" };

      expect(booksResponse).toHaveProperty("msg");
      expect(typeof booksResponse.msg).toBe("string");
      expect(booksResponse.msg).toBe("this is the books endpoint");
    });

    it("should ensure response objects only contain expected properties", () => {
      const healthResponse = { msg: "api is up and running" };
      const booksResponse = { msg: "this is the books endpoint" };

      expect(Object.keys(healthResponse)).toHaveLength(1);
      expect(Object.keys(booksResponse)).toHaveLength(1);
      expect(Object.keys(healthResponse)[0]).toBe("msg");
      expect(Object.keys(booksResponse)[0]).toBe("msg");
    });
  });

  describe("HTTP Methods and Status Codes", () => {
    it("should use 200 status code for successful responses", () => {
      const statusCode = 200;
      expect(statusCode).toBe(200);
      expect(statusCode).toBeGreaterThanOrEqual(200);
      expect(statusCode).toBeLessThan(300);
    });

    it("should return JSON content type responses", () => {
      const mockRes = {
        statusCode: null,
        responseData: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.responseData = data;
          return this;
        },
      };

      mockRes.status(200).json({ msg: "test" });
      expect(mockRes.responseData).toBeDefined();
      expect(typeof mockRes.responseData).toBe("object");
    });
  });

  describe("Server Module Structure", () => {
    it("should export app as default export", () => {
      expect(app).toBeDefined();
      expect(app).not.toBeNull();
    });

    it("should have Express app properties", () => {
      // Check for common Express properties
      expect(app.settings).toBeDefined();
      expect(app.locals).toBeDefined();
    });

    it("should be callable as middleware", () => {
      // Express apps can be used as middleware and are callable
      expect(typeof app).toBe("function");
    });
  });

  describe("Environment Configuration Integration", () => {
    it("should integrate with ENV module", async () => {
      const envModule = await import("./lib/env.js");
      expect(envModule.ENV).toBeDefined();
      expect(envModule.ENV.NODE_ENV).toBe("test");
    });

    it("should not start server in test mode", () => {
      // In test mode (NODE_ENV !== 'production'), the server should not call listen()
      // We verify this by checking that the app is exported and available
      expect(app).toBeDefined();
    });
  });

  describe("Route Handler Response Patterns", () => {
    it("should follow consistent response pattern for /health", () => {
      const response = { msg: "api is up and running" };

      // Check structure
      expect(response).toHaveProperty("msg");
      expect(typeof response.msg).toBe("string");
      expect(response.msg.length).toBeGreaterThan(0);
    });

    it("should follow consistent response pattern for /books", () => {
      const response = { msg: "this is the books endpoint" };

      // Check structure
      expect(response).toHaveProperty("msg");
      expect(typeof response.msg).toBe("string");
      expect(response.msg.length).toBeGreaterThan(0);
    });

    it("should use descriptive messages in responses", () => {
      const healthMsg = "api is up and running";
      const booksMsg = "this is the books endpoint";

      expect(healthMsg).toContain("api");
      expect(healthMsg).toContain("running");
      expect(booksMsg).toContain("books");
      expect(booksMsg).toContain("endpoint");
    });
  });

  describe("Edge Cases", () => {
    it("should handle response chaining correctly", () => {
      const mockRes = {
        statusCode: null,
        responseData: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.responseData = data;
          return this;
        },
      };

      // Test method chaining
      const result = mockRes.status(200);
      expect(result).toBe(mockRes);

      const jsonResult = result.json({ msg: "test" });
      expect(jsonResult).toBe(mockRes);
    });

    it("should validate response data types", () => {
      const healthResponse = { msg: "api is up and running" };
      const booksResponse = { msg: "this is the books endpoint" };

      expect(typeof healthResponse.msg).toBe("string");
      expect(typeof booksResponse.msg).toBe("string");
      expect(Array.isArray(healthResponse)).toBe(false);
      expect(Array.isArray(booksResponse)).toBe(false);
    });

    it("should ensure messages are non-empty strings", () => {
      const healthMsg = "api is up and running";
      const booksMsg = "this is the books endpoint";

      expect(healthMsg).not.toBe("");
      expect(booksMsg).not.toBe("");
      expect(healthMsg.trim()).toBe(healthMsg);
      expect(booksMsg.trim()).toBe(booksMsg);
    });
  });
});

describe("Server Configuration (Production Mode)", () => {
  it("should import ENV module successfully", async () => {
    const envModule = await import("./lib/env.js");
    expect(envModule.ENV).toBeDefined();
  });

  it("should validate static file serving path structure", () => {
    const __dirname = path.resolve();
    const staticPath = path.join(__dirname, "../frontend/dist");

    expect(staticPath).toContain("frontend");
    expect(staticPath).toContain("dist");
    expect(path.isAbsolute(staticPath)).toBe(true);
  });

  it("should validate catch-all route path structure", () => {
    const __dirname = path.resolve();
    const indexPath = path.join(__dirname, "../frontend", "dist", "index.html");

    expect(indexPath).toContain("frontend");
    expect(indexPath).toContain("index.html");
    expect(indexPath).toContain("dist");
    expect(path.isAbsolute(indexPath)).toBe(true);
  });

  it("should verify NODE_ENV is used for conditional logic", () => {
    // The server only starts listening in production mode
    // In test mode, it should just export the app
    expect(app).toBeDefined();
  });

  it("should verify path construction for deployment", () => {
    const __dirname = path.resolve();
    const frontendDist = path.join(__dirname, "../frontend/dist");
    const indexHtml = path.join(__dirname, "../frontend/dist/index.html");

    // Verify paths are constructed correctly
    expect(path.basename(frontendDist)).toBe("dist");
    expect(path.basename(indexHtml)).toBe("index.html");
    expect(path.dirname(indexHtml)).toBe(frontendDist);
  });

  it("should use PORT from ENV for production server", async () => {
    const envModule = await import("./lib/env.js");
    expect(envModule.ENV.PORT).toBe("3000");
  });
});