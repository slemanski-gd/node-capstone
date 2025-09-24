import { db } from "../config/database/db.mjs";
import { selectAllUsers, insertUser } from "../models/user.mjs";
import { ERROR_MESSAGES } from "../shared/constants.mjs";

const addUser = async (req, res) => {
  console.log(req.body);
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: ERROR_MESSAGES.USERNAME_REQUIRED });
  }

  try {
    const userId = await insertUser(db, username);
    res.json({ username, _id: userId });
  } catch (error) {
    console.error(error);
    if (error.message.includes("UNIQUE constraint failed")) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.USERNAME_ALREADY_EXISTS });
    }
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getUsers = async (_, res) => {
  try {
    const users = await selectAllUsers(db);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export { addUser, getUsers };
