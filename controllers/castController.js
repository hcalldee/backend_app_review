const castModel = require("../models/castModel");

const getAllCasts = async (req, res) => {
  try {
    const casts = await castModel.getAllCasts();

    return res.status(200).json({
      success: true,
      message: "Get all casts success",
      data: casts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get casts",
      error: error.message,
    });
  }
};

const getCastById = async (req, res) => {
  try {
    const cast = await castModel.getCastById(req.params.id);

    if (!cast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get cast by id success",
      data: cast,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get cast",
      error: error.message,
    });
  }
};

const searchCasts = async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "keyword is required",
      });
    }

    const casts = await castModel.searchCasts(keyword);

    return res.status(200).json({
      success: true,
      message: "Search casts success",
      data: casts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search casts",
      error: error.message,
    });
  }
};

const createCast = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const createdCast = await castModel.createCast(req.body);

    return res.status(201).json({
      success: true,
      message: "Create cast success",
      data: createdCast,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create cast",
      error: error.message,
    });
  }
};

const updateCast = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const existingCast = await castModel.getCastById(req.params.id);

    if (!existingCast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found",
      });
    }

    const updatedCast = await castModel.updateCast(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update cast success",
      data: updatedCast,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cast",
      error: error.message,
    });
  }
};

const deleteCast = async (req, res) => {
  try {
    const existingCast = await castModel.getCastById(req.params.id);

    if (!existingCast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found",
      });
    }

    await castModel.deleteCast(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Delete cast success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete cast",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCasts,
  getCastById,
  searchCasts,
  createCast,
  updateCast,
  deleteCast,
};
