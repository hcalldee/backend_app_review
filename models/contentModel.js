const { randomUUID } = require("crypto");
const db = require("../config/db");

const getAllContents = async () => {
  const [rows] = await db.execute(
    `SELECT 
      id,
      title,
      content_type AS contentType,
      synopsis,
      poster_url AS posterUrl,
      trailer_url AS trailerUrl,
      release_year AS releaseYear,
      publisher_id AS publisherId,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM contents
    ORDER BY created_at DESC`
  );

  return rows;
};

const getContentById = async (id) => {
  const [rows] = await db.execute(
    `SELECT 
      id,
      title,
      content_type AS contentType,
      synopsis,
      poster_url AS posterUrl,
      trailer_url AS trailerUrl,
      release_year AS releaseYear,
      publisher_id AS publisherId,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM contents
    WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

const createContent = async (payload) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO contents (
      id,
      title,
      content_type,
      synopsis,
      poster_url,
      trailer_url,
      release_year,
      publisher_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      payload.title,
      payload.contentType,
      payload.synopsis || null,
      payload.posterUrl || null,
      payload.trailerUrl || null,
      payload.releaseYear || null,
      payload.publisherId || null,
    ]
  );

  return getContentById(id);
};

const updateContent = async (id, payload) => {
  await db.execute(
    `UPDATE contents
    SET
      title = ?,
      content_type = ?,
      synopsis = ?,
      poster_url = ?,
      trailer_url = ?,
      release_year = ?,
      publisher_id = ?
    WHERE id = ?`,
    [
      payload.title,
      payload.contentType,
      payload.synopsis || null,
      payload.posterUrl || null,
      payload.trailerUrl || null,
      payload.releaseYear || null,
      payload.publisherId || null,
      id,
    ]
  );

  return getContentById(id);
};

const deleteContent = async (id) => {
  const [result] = await db.execute("DELETE FROM contents WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
