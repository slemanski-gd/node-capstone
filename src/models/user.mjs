import { v4 as uuidv4 } from "uuid";

/**
 * Creates the "users" table in the database if it doesn't exist.
 */
const createUserTable = async (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            _id TEXT PRIMARY KEY,
            username TEXT UNIQUE NOT NULL
        )
    `;
  await db.run(createTableQuery);
};

/**
 * Insert a new user into the database.
 */
const insertUser = async (db, username) => {
  const newId = uuidv4();
  const insertQuery = `INSERT INTO users (_id, username) VALUES (?, ?)`;
  const result = await db.run(insertQuery, [newId, username]);
  return newId;
};

/**
 * Retrieve all users from the database.
 */
const selectAllUsers = async (db) => {
  const selectQuery = `SELECT * FROM users`;
  const users = await db.all(selectQuery);
  return users;
};

/**
 * Retrieve a user by their ID.
 */
const getUserById = async (db, userId) => {
  const users = await selectAllUsers(db);
  const user = users.find((u) => u._id === parseInt(userId));
  return user;
};

export { createUserTable, insertUser, selectAllUsers, getUserById };
