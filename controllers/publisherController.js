const publisherModel = require("../models/publisherModel");

const getAllPublishers = async (req, res) => {
  try {
    const publishers = await publisherModel.getAllPublishers();

    return res.status(200).json({
      success: true,
      message: "Get all publishers success",
      data: publishers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get publishers",
      error: error.message,
    });
  }
};

const getPublisherById = async (req, res) => {
  try {
    const publisher = await publisherModel.getPublisherById(req.params.id);

    if (!publisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get publisher by id success",
      data: publisher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get publisher",
      error: error.message,
    });
  }
};

const searchPublishers = async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "keyword is required",
      });
    }

    const publishers = await publisherModel.searchPublishers(keyword);

    return res.status(200).json({
      success: true,
      message: "Search publishers success",
      data: publishers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search publishers",
      error: error.message,
    });
  }
};

const createPublisher = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const createdPublisher = await publisherModel.createPublisher(req.body);

    return res.status(201).json({
      success: true,
      message: "Create publisher success",
      data: createdPublisher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create publisher",
      error: error.message,
    });
  }
};

const updatePublisher = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const existingPublisher = await publisherModel.getPublisherById(req.params.id);

    if (!existingPublisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    const updatedPublisher = await publisherModel.updatePublisher(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update publisher success",
      data: updatedPublisher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update publisher",
      error: error.message,
    });
  }
};

const deletePublisher = async (req, res) => {
  try {
    const existingPublisher = await publisherModel.getPublisherById(req.params.id);

    if (!existingPublisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    await publisherModel.deletePublisher(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Delete publisher success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete publisher",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPublishers,
  getPublisherById,
  searchPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
