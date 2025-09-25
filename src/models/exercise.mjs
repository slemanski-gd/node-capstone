/**
 * Creates the "exercises" table in the database if it doesn't exist.
 */
const createExercisesTable = async (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS exercises (
            _id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            description TEXT NOT NULL,
            duration INTEGER NOT NULL,
            date TEXT NOT NULL,
            user_id TEXT,
            FOREIGN KEY (user_id) REFERENCES users(_id)
        )
    `;
  await db.run(createTableQuery);
};

/**
 * Inserts a new exercise record into the "exercises" table.
 */
const insertExercise = async (db, exerciseData) => {
  const newId = uuidv4();
  const { username, description, duration, date, user_id } = exerciseData;
  const insertQuery = `
        INSERT INTO exercises (_id, username, description, duration, date, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  await db.run(insertQuery, [
    newId,
    username,
    description,
    duration,
    date,
    user_id,
  ]);
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
