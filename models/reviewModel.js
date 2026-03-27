const { randomUUID } = require("crypto");
const db = require("../config/db");

const getAllReviews = async () => {
  const [rows] = await db.execute(
    `SELECT
      id,
      content_id AS contentId,
      comment,
      rating,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM reviews
    ORDER BY created_at DESC`
  );

  return rows;
};

const getReviewById = async (id) => {
  const [rows] = await db.execute(
    `SELECT
      id,
      content_id AS contentId,
      comment,
      rating,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM reviews
    WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

const createReview = async (payload) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO reviews (
      id,
      content_id,
      comment,
      rating
    ) VALUES (?, ?, ?, ?)`,
    [
      id,
      payload.contentId,
      payload.comment,
      payload.rating,
    ]
  );

  return getReviewById(id);
};

const updateReview = async (id, payload) => {
  await db.execute(
    `UPDATE reviews
    SET
      content_id = ?,
      comment = ?,
      rating = ?
    WHERE id = ?`,
    [
      payload.contentId,
      payload.comment,
      payload.rating,
      id,
    ]
  );

  return getReviewById(id);
};

const deleteReview = async (id) => {
  const [result] = await db.execute("DELETE FROM reviews WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
