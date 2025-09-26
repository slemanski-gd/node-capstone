import { v4 as uuidv4 } from "uuid";
import { normalizeId } from "../shared/utils/normalizeId.mjs";

/**
 * Creates the "exercises" table in the database if it doesn't exist.
 */
const createExercisesTable = async (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS exercises (
            exercise_id TEXT PRIMARY KEY,
            user_id TEXT,
            username TEXT NOT NULL,
            description TEXT NOT NULL,
            duration INTEGER NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(_id)
        )
    `;
  await db.run(createTableQuery);
};

/**
 * Inserts a new exercise record into the "exercises" table.
 */
const insertExercise = async (db, exerciseData) => {
  const exercise_id = normalizeId(uuidv4());
  const { user_id, username, description, duration, date } = exerciseData;
  const insertQuery = `
        INSERT INTO exercises (exercise_id, user_id, username, description, duration, date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  await db.run(insertQuery, [
    exercise_id,
    user_id,
    username,
    description,
    duration,
    date,
  ]);
  return exercise_id;
};

/**
 * Selects all exercises for a given user ID.
 */
const selectExercisesByUserId = async (db, userId) => {
  const selectQuery = `SELECT * FROM exercises WHERE user_id = ?`;
  const exercises = await db.all(selectQuery, [userId]);
  return exercises;
};

export { createExercisesTable, insertExercise, selectExercisesByUserId };
