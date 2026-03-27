const contentModel = require("../models/contentModel");
const castModel = require("../models/castModel");
const contentCastModel = require("../models/contentCastModel");

const getCastsByContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    const content = await contentModel.getContentById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const casts = await contentCastModel.getCastsByContentId(contentId);

    return res.status(200).json({
      success: true,
      message: "Get casts by content success",
      data: casts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get casts by content",
      error: error.message,
    });
  }
};

const addCastToContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { castId, roleName } = req.body;

    if (!castId) {
      return res.status(400).json({
        success: false,
        message: "castId is required",
      });
    }

    const content = await contentModel.getContentById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const cast = await castModel.getCastById(castId);
    if (!cast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found",
      });
    }

    const created = await contentCastModel.createContentCast({
      contentId,
      castId,
      roleName,
    });

    return res.status(201).json({
      success: true,
      message: "Add cast to content success",
      data: created,
    });
  } catch (error) {
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cast already assigned to content",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add cast to content",
      error: error.message,
    });
  }
};

const removeCastFromContent = async (req, res) => {
  try {
    const { contentId, castId } = req.params;

    const content = await contentModel.getContentById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const cast = await castModel.getCastById(castId);
    if (!cast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found",
      });
    }

    const deleted = await contentCastModel.deleteContentCastByContentAndCast(contentId, castId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cast is not assigned to this content",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Remove cast from content success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove cast from content",
      error: error.message,
    });
  }
};

module.exports = {
  getCastsByContent,
  addCastToContent,
  removeCastFromContent,
};

