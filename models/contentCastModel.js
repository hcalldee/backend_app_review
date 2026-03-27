const { randomUUID } = require("crypto");
const db = require("../config/db");

const getContentCastById = async (id) => {
  const [rows] = await db.execute(
    `SELECT
      cc.id,
      cc.content_id AS contentId,
      cc.cast_id AS castId,
      cc.role_name AS roleName,
      cc.created_at AS createdAt,
      c.name,
      c.dob,
      c.nationality
    FROM content_casts cc
    INNER JOIN casts c ON c.id = cc.cast_id
    WHERE cc.id = ?`,
    [id]
  );

  return rows[0] || null;
};

const getCastsByContentId = async (contentId) => {
  const [rows] = await db.execute(
    `SELECT
      cc.id,
      cc.content_id AS contentId,
      cc.cast_id AS castId,
      cc.role_name AS roleName,
      cc.created_at AS createdAt,
      c.name,
      c.dob,
      c.nationality
    FROM content_casts cc
    INNER JOIN casts c ON c.id = cc.cast_id
    WHERE cc.content_id = ?
    ORDER BY c.name ASC`,
    [contentId]
  );

  return rows;
};

const createContentCast = async (payload) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO content_casts (
      id,
      content_id,
      cast_id,
      role_name
    ) VALUES (?, ?, ?, ?)`,
    [
      id,
      payload.contentId,
      payload.castId,
      payload.roleName || null,
    ]
  );

  return getContentCastById(id);
};

const deleteContentCastByContentAndCast = async (contentId, castId) => {
  const [result] = await db.execute(
    "DELETE FROM content_casts WHERE content_id = ? AND cast_id = ?",
    [contentId, castId]
  );

  return result.affectedRows > 0;
};

module.exports = {
  getContentCastById,
  getCastsByContentId,
  createContentCast,
  deleteContentCastByContentAndCast,
};

