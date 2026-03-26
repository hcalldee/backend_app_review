const contentModel = require("../models/contentModel");

const getAllContents = async (req, res) => {
  try {
    const contents = await contentModel.getAllContents();

    return res.status(200).json({
      success: true,
      message: "Get all contents success",
      data: contents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get contents",
      error: error.message,
    });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await contentModel.getContentById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get content by id success",
      data: content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get content",
      error: error.message,
    });
  }
};

const createContent = async (req, res) => {
  try {
    const { title, contentType } = req.body;

    if (!title || !contentType) {
      return res.status(400).json({
        success: false,
        message: "title and contentType are required",
      });
    }

    const createdContent = await contentModel.createContent(req.body);

    return res.status(201).json({
      success: true,
      message: "Create content success",
      data: createdContent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create content",
      error: error.message,
    });
  }
};

const updateContent = async (req, res) => {
  try {
    const { title, contentType } = req.body;

    if (!title || !contentType) {
      return res.status(400).json({
        success: false,
        message: "title and contentType are required",
      });
    }

    const existingContent = await contentModel.getContentById(req.params.id);

    if (!existingContent) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const updatedContent = await contentModel.updateContent(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Update content success",
      data: updatedContent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update content",
      error: error.message,
    });
  }
};

const deleteContent = async (req, res) => {
  try {
    const existingContent = await contentModel.getContentById(req.params.id);

    if (!existingContent) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    await contentModel.deleteContent(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Delete content success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete content",
      error: error.message,
    });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
