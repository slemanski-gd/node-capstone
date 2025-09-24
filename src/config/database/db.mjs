import { Database } from "sqlite-async";
import { createUserTable } from "../../models/user.mjs";
import { createExercisesTable } from "../../models/exercise.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "index.db");

/**
 * Initialize the database and create necessary tables if they don't exist.
 */
const initDb = async () => {
  const db = await Database.open(dbPath);

  await createUserTable(db);
  await createExercisesTable(db);

  return db;
};
const db = await initDb();

export { db, dbPath };
