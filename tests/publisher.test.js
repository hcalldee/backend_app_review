jest.mock("../models/publisherModel", () => ({
  getAllPublishers: jest.fn(),
  getPublisherById: jest.fn(),
  searchPublishers: jest.fn(),
  createPublisher: jest.fn(),
  updatePublisher: jest.fn(),
  deletePublisher: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const publisherModel = require("../models/publisherModel");

describe("Publisher Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/publishers should return all publishers", async () => {
    publisherModel.getAllPublishers.mockResolvedValue([
      { id: "pub-1", name: "Warner Bros" },
    ]);

    const response = await request(app).get("/api/publishers");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("GET /api/publishers/:id should return 404 when publisher not found", async () => {
    publisherModel.getPublisherById.mockResolvedValue(null);

    const response = await request(app).get("/api/publishers/unknown-id");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/publishers/search should return search results", async () => {
    publisherModel.searchPublishers.mockResolvedValue([
      { id: "pub-2", name: "Warner Bros" },
    ]);

    const response = await request(app)
      .post("/api/publishers/search")
      .send({ keyword: "warner" });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("POST /api/publishers/search should return 400 when keyword is missing", async () => {
    const response = await request(app)
      .post("/api/publishers/search")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/publishers should create new publisher", async () => {
    const payload = {
      name: "Netflix",
    };

    publisherModel.createPublisher.mockResolvedValue({
      id: "pub-3",
      ...payload,
    });

    const response = await request(app).post("/api/publishers").send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Netflix");
  });

  test("POST /api/publishers should return 400 when name is missing", async () => {
    const response = await request(app).post("/api/publishers").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("PUT /api/publishers/:id should update publisher", async () => {
    const payload = {
      name: "HBO",
    };

    publisherModel.getPublisherById.mockResolvedValue({
      id: "pub-4",
      name: "Old Publisher",
    });

    publisherModel.updatePublisher.mockResolvedValue({
      id: "pub-4",
      ...payload,
    });

    const response = await request(app)
      .put("/api/publishers/pub-4")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("HBO");
  });

  test("DELETE /api/publishers/:id should delete publisher", async () => {
    publisherModel.getPublisherById.mockResolvedValue({
      id: "pub-5",
      name: "Paramount",
    });

    publisherModel.deletePublisher.mockResolvedValue(true);

    const response = await request(app).delete("/api/publishers/pub-5");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
