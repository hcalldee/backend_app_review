const { randomUUID } = require("crypto");
const db = require("../config/db");

const getAllCasts = async () => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      dob,
      nationality,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM casts
    ORDER BY created_at DESC`
  );

  return rows;
};

const getCastById = async (id) => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      dob,
      nationality,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM casts
    WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

const searchCasts = async (keyword) => {
  const [rows] = await db.execute(
    `SELECT
      id,
      name,
      dob,
      nationality,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM casts
    WHERE name LIKE ?
    ORDER BY created_at DESC`,
    [`%${keyword}%`]
  );

  return rows;
};

const createCast = async (payload) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO casts (
      id,
      name,
      dob,
      nationality
    ) VALUES (?, ?, ?, ?)`,
    [
      id,
      payload.name,
      payload.dob || null,
      payload.nationality || null,
    ]
  );

  return getCastById(id);
};

const updateCast = async (id, payload) => {
  await db.execute(
    `UPDATE casts
    SET
      name = ?,
      dob = ?,
      nationality = ?
    WHERE id = ?`,
    [
      payload.name,
      payload.dob || null,
      payload.nationality || null,
      id,
    ]
  );

  return getCastById(id);
};

const deleteCast = async (id) => {
  const [result] = await db.execute("DELETE FROM casts WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllCasts,
  getCastById,
  searchCasts,
  createCast,
  updateCast,
  deleteCast,
};
