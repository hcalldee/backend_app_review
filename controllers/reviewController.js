const reviewModel = require("../models/reviewModel");

const isValidHalfStepRating = (rating) => {
  const numericRating = Number(rating);
  return Number.isFinite(numericRating) && numericRating >= 1 && numericRating <= 5 && Number.isInteger(numericRating * 2);
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();

    return res.status(200).json({
      success: true,
      message: "Get all reviews success",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await reviewModel.getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get review by id success",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get review",
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { contentId, comment, rating } = req.body;

    if (!contentId || !comment || rating === undefined || rating === null) {
      return res.status(400).json({
        success: false,
        message: "contentId, comment, and rating are required",
      });
    }

    if (comment.length > 120) {
      return res.status(400).json({
        success: false,
        message: "comment must be 120 characters or less",
      });
    }

    if (!isValidHalfStepRating(rating)) {
      return res.status(400).json({
        success: false,
        message: "rating must be between 1 and 5 with 0.5 increments",
      });
    }

    const createdReview = await reviewModel.createReview(req.body);

    return res.status(201).json({
      success: true,
      message: "Create review success",
      data: createdReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { contentId, comment, rating } = req.body;

    if (!contentId || !comment || rating === undefined || rating === null) {
      return res.status(400).json({
        success: false,
        message: "contentId, comment, and rating are required",
      });
    }

    if (comment.length > 120) {
      return res.status(400).json({
        success: false,
        message: "comment must be 120 characters or less",
      });
    }

    if (!isValidHalfStepRating(rating)) {
      return res.status(400).json({
        success: false,
        message: "rating must be between 1 and 5 with 0.5 increments",
      });
    }

    const existingReview = await reviewModel.getReviewById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const updatedReview = await reviewModel.updateReview(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update review success",
      data: updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const existingReview = await reviewModel.getReviewById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await reviewModel.deleteReview(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Delete review success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
