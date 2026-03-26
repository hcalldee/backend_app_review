const { randomUUID } = require("crypto");
const db = require("../config/db");

const getAllPublishers = async () => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM publishers
    ORDER BY created_at DESC`
  );

  return rows;
};

const getPublisherById = async (id) => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM publishers
    WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

const searchPublishers = async (keyword) => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM publishers
    WHERE name LIKE ?
    ORDER BY created_at DESC`,
    [`%${keyword}%`]
  );

  return rows;
};

const createPublisher = async (payload) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO publishers (
      id,
      name
    ) VALUES (?, ?)`,
    [id, payload.name]
  );

  return getPublisherById(id);
};

const updatePublisher = async (id, payload) => {
  await db.execute(
    `UPDATE publishers
    SET
      name = ?
    WHERE id = ?`,
    [payload.name, id]
  );

  return getPublisherById(id);
};

const deletePublisher = async (id) => {
  const [result] = await db.execute("DELETE FROM publishers WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllPublishers,
  getPublisherById,
  searchPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
