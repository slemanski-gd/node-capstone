const createUserTable = async (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL
        )
    `;
  await db.run(createTableQuery);
};

const insertUser = async (db, username) => {
  const insertQuery = `INSERT INTO users (username) VALUES (?)`;
  const result = await db.run(insertQuery, [username]);
  return result.lastID;
};

const selectAllUsers = async (db) => {
  const selectQuery = `SELECT * FROM users`;
  const users = await db.all(selectQuery);
  return users;
};

export { createUserTable, insertUser, selectAllUsers };
