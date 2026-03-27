jest.mock("../models/castModel", () => ({
  getAllCasts: jest.fn(),
  getCastById: jest.fn(),
  searchCasts: jest.fn(),
  createCast: jest.fn(),
  updateCast: jest.fn(),
  deleteCast: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const castModel = require("../models/castModel");

describe("Cast Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/casts should return all casts", async () => {
    castModel.getAllCasts.mockResolvedValue([
      { id: "cast-1", name: "Tom Holland", dob: "1996-06-01", nationality: "British" },
    ]);

    const response = await request(app).get("/api/casts");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("GET /api/casts/:id should return 404 when cast not found", async () => {
    castModel.getCastById.mockResolvedValue(null);

    const response = await request(app).get("/api/casts/unknown-id");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/casts/search should return search results", async () => {
    castModel.searchCasts.mockResolvedValue([
      { id: "cast-2", name: "Tom Cruise", dob: "1962-07-03", nationality: "American" },
    ]);

    const response = await request(app)
      .post("/api/casts/search")
      .send({ keyword: "tom" });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("POST /api/casts/search should return 400 when keyword is missing", async () => {
    const response = await request(app)
      .post("/api/casts/search")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/casts should create new cast", async () => {
    const payload = {
      name: "Tom Holland",
      dob: "1996-06-01",
      nationality: "British",
    };

    castModel.createCast.mockResolvedValue({
      id: "cast-3",
      ...payload,
    });

    const response = await request(app).post("/api/casts").send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Tom Holland");
  });

  test("POST /api/casts should return 400 when name is missing", async () => {
    const response = await request(app).post("/api/casts").send({
      dob: "1996-06-01",
      nationality: "British",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("PUT /api/casts/:id should update cast", async () => {
    const payload = {
      name: "Scarlett Johansson",
      dob: "1984-11-22",
      nationality: "American",
    };

    castModel.getCastById.mockResolvedValue({
      id: "cast-4",
      name: "Old Name",
      dob: null,
      nationality: null,
    });

    castModel.updateCast.mockResolvedValue({
      id: "cast-4",
      ...payload,
    });

    const response = await request(app)
      .put("/api/casts/cast-4")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Scarlett Johansson");
  });

  test("DELETE /api/casts/:id should delete cast", async () => {
    castModel.getCastById.mockResolvedValue({
      id: "cast-5",
      name: "Zendaya",
      dob: "1996-09-01",
      nationality: "American",
    });

    castModel.deleteCast.mockResolvedValue(true);

    const response = await request(app).delete("/api/casts/cast-5");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
