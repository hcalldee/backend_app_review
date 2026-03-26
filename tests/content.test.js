jest.mock("../models/contentModel", () => ({
  getAllContents: jest.fn(),
  getContentById: jest.fn(),
  createContent: jest.fn(),
  updateContent: jest.fn(),
  deleteContent: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const contentModel = require("../models/contentModel");

describe("Content Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/contents should return all contents", async () => {
    contentModel.getAllContents.mockResolvedValue([
      { id: "1", title: "Inception", contentType: "movie" },
    ]);

    const response = await request(app).get("/api/contents");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("GET /api/contents/:id should return 404 when content not found", async () => {
    contentModel.getContentById.mockResolvedValue(null);

    const response = await request(app).get("/api/contents/unknown-id");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/contents should create new content", async () => {
    const payload = {
      title: "Inception",
      contentType: "movie",
      synopsis: "Dream inside a dream",
    };

    contentModel.createContent.mockResolvedValue({
      id: "uuid-1",
      ...payload,
    });

    const response = await request(app).post("/api/contents").send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Inception");
  });

  test("POST /api/contents should return 400 when title is missing", async () => {
    const response = await request(app).post("/api/contents").send({
      contentType: "movie",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("PUT /api/contents/:id should update content", async () => {
    const payload = {
      title: "Interstellar",
      contentType: "movie",
    };

    contentModel.getContentById.mockResolvedValue({
      id: "uuid-2",
      title: "Old Title",
      contentType: "movie",
    });

    contentModel.updateContent.mockResolvedValue({
      id: "uuid-2",
      ...payload,
    });

    const response = await request(app).put("/api/contents/uuid-2").send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Interstellar");
  });

  test("DELETE /api/contents/:id should delete content", async () => {
    contentModel.getContentById.mockResolvedValue({
      id: "uuid-3",
      title: "The Batman",
      contentType: "movie",
    });

    contentModel.deleteContent.mockResolvedValue(true);

    const response = await request(app).delete("/api/contents/uuid-3");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
