// templates/tests/integration/api.test.js
import request from "supertest";
import app from "../../src/index.js";

describe("API Integration Tests", () => {
  test("GET /api/hello returns correct message", async () => {
    const response = await request(app).get("/api/hello");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello, World!" });
  });
});
