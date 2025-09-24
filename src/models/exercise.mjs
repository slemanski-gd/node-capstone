const createExercisesTable = async (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS exercises (
            username TEXT NOT NULL,
            description TEXT NOT NULL,
            duration INTEGER NOT NULL,
            date TEXT,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `;
  await db.run(createTableQuery);
};

export { createExercisesTable };
