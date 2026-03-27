jest.mock("../models/contentModel", () => ({
  getAllContents: jest.fn(),
  getContentById: jest.fn(),
  createContent: jest.fn(),
  updateContent: jest.fn(),
  deleteContent: jest.fn(),
}));

jest.mock("../models/castModel", () => ({
  getAllCasts: jest.fn(),
  getCastById: jest.fn(),
  searchCasts: jest.fn(),
  createCast: jest.fn(),
  updateCast: jest.fn(),
  deleteCast: jest.fn(),
}));

jest.mock("../models/contentCastModel", () => ({
  getContentCastById: jest.fn(),
  getCastsByContentId: jest.fn(),
  createContentCast: jest.fn(),
  deleteContentCastByContentAndCast: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const contentModel = require("../models/contentModel");
const castModel = require("../models/castModel");
const contentCastModel = require("../models/contentCastModel");

describe("Content Cast Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/contents/:contentId/casts should return 404 when content not found", async () => {
    contentModel.getContentById.mockResolvedValue(null);

    const response = await request(app).get("/api/contents/content-1/casts");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("GET /api/contents/:contentId/casts should return casts list", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1", title: "X", contentType: "movie" });
    contentCastModel.getCastsByContentId.mockResolvedValue([
      { id: "cc-1", contentId: "content-1", castId: "cast-1", roleName: null, name: "Tom", dob: null, nationality: null },
    ]);

    const response = await request(app).get("/api/contents/content-1/casts");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("POST /api/contents/:contentId/casts should return 400 when castId missing", async () => {
    const response = await request(app)
      .post("/api/contents/content-1/casts")
      .send({ roleName: "Hero" });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/contents/:contentId/casts should return 404 when content not found", async () => {
    contentModel.getContentById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/contents/content-1/casts")
      .send({ castId: "cast-1" });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/contents/:contentId/casts should return 404 when cast not found", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1" });
    castModel.getCastById.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/contents/content-1/casts")
      .send({ castId: "cast-1" });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/contents/:contentId/casts should create relation", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1" });
    castModel.getCastById.mockResolvedValue({ id: "cast-1", name: "Tom" });
    contentCastModel.createContentCast.mockResolvedValue({
      id: "cc-1",
      contentId: "content-1",
      castId: "cast-1",
      roleName: "Hero",
      name: "Tom",
      dob: null,
      nationality: null,
    });

    const response = await request(app)
      .post("/api/contents/content-1/casts")
      .send({ castId: "cast-1", roleName: "Hero" });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.castId).toBe("cast-1");
  });

  test("POST /api/contents/:contentId/casts should return 409 on duplicate", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1" });
    castModel.getCastById.mockResolvedValue({ id: "cast-1", name: "Tom" });
    contentCastModel.createContentCast.mockRejectedValue({ code: "ER_DUP_ENTRY" });

    const response = await request(app)
      .post("/api/contents/content-1/casts")
      .send({ castId: "cast-1" });

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
  });

  test("DELETE /api/contents/:contentId/casts/:castId should return 404 when relation not found", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1" });
    castModel.getCastById.mockResolvedValue({ id: "cast-1" });
    contentCastModel.deleteContentCastByContentAndCast.mockResolvedValue(false);

    const response = await request(app).delete("/api/contents/content-1/casts/cast-1");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("DELETE /api/contents/:contentId/casts/:castId should delete relation", async () => {
    contentModel.getContentById.mockResolvedValue({ id: "content-1" });
    castModel.getCastById.mockResolvedValue({ id: "cast-1" });
    contentCastModel.deleteContentCastByContentAndCast.mockResolvedValue(true);

    const response = await request(app).delete("/api/contents/content-1/casts/cast-1");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

