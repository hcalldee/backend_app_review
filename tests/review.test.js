jest.mock("../models/reviewModel", () => ({
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  createReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const reviewModel = require("../models/reviewModel");

describe("Review Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/reviews should return all reviews", async () => {
    reviewModel.getAllReviews.mockResolvedValue([
      { id: "review-1", contentId: "content-1", comment: "Bagus banget", rating: 4.5 },
    ]);

    const response = await request(app).get("/api/reviews");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test("GET /api/reviews/:id should return 404 when review not found", async () => {
    reviewModel.getReviewById.mockResolvedValue(null);

    const response = await request(app).get("/api/reviews/unknown-id");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/reviews should create new review", async () => {
    const payload = {
      contentId: "content-1",
      comment: "Filmnya seru dan visualnya keren.",
      rating: 4.5,
    };

    reviewModel.createReview.mockResolvedValue({
      id: "review-2",
      ...payload,
    });

    const response = await request(app).post("/api/reviews").send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.rating).toBe(4.5);
  });

  test("POST /api/reviews should return 400 when contentId is missing", async () => {
    const response = await request(app).post("/api/reviews").send({
      comment: "Bagus",
      rating: 4,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/reviews should return 400 when comment is more than 120 characters", async () => {
    const response = await request(app).post("/api/reviews").send({
      contentId: "content-1",
      comment: "a".repeat(121),
      rating: 4,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/reviews should return 400 when rating is not half-step", async () => {
    const response = await request(app).post("/api/reviews").send({
      contentId: "content-1",
      comment: "Cukup oke",
      rating: 3.7,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("PUT /api/reviews/:id should update review", async () => {
    const payload = {
      contentId: "content-1",
      comment: "Lebih bagus dari ekspektasi.",
      rating: 5,
    };

    reviewModel.getReviewById.mockResolvedValue({
      id: "review-3",
      contentId: "content-1",
      comment: "Lama",
      rating: 3,
    });

    reviewModel.updateReview.mockResolvedValue({
      id: "review-3",
      ...payload,
    });

    const response = await request(app)
      .put("/api/reviews/review-3")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.rating).toBe(5);
  });

  test("DELETE /api/reviews/:id should delete review", async () => {
    reviewModel.getReviewById.mockResolvedValue({
      id: "review-4",
      contentId: "content-1",
      comment: "Mantap",
      rating: 4,
    });

    reviewModel.deleteReview.mockResolvedValue(true);

    const response = await request(app).delete("/api/reviews/review-4");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
