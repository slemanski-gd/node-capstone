import { db } from "../config/database/db.mjs";
import { selectAllUsers, insertUser, getUserById } from "../models/user.mjs";
import { ERROR_MESSAGES } from "../shared/constants.mjs";
import {
  insertExercise,
  selectExercisesByUserId,
} from "../models/exercise.mjs";
import { filterExercises } from "../shared/utils/filterExercises.mjs";

/**
 * Add a new user to the database.
 */
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

/**
 * Get all users from the database.
 */
const getUsers = async (_, res) => {
  try {
    const users = await selectAllUsers(db);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Add an exercise for a specific user.
 */
const addExercise = async (req, res, userId) => {
  const user = await getUserById(db, userId);
  if (!user) {
    return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
  }

  console.log(req.body);

  const { description, duration, date } = req.body;

  if (!date) {
    req.body.date = new Date().toDateString();
  }

  if (!description || !duration) {
    return res
      .status(400)
      .json({ error: ERROR_MESSAGES.EXERCISE_FIELDS_REQUIRED });
  }

  try {
    const formattedDate = new Date(date).toDateString();
    const exerciseData = {
      username: user.username,
      description,
      duration: parseInt(duration),
      date: formattedDate,
      user_id: user._id,
    };
    await insertExercise(db, exerciseData);
    res.json({ ...exerciseData, _id: user._id });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

/**
 * Get user logs as specified in docs.
 */
const getUserLogs = async (req, res, userId, queryParams) => {
  const user = await getUserById(db, userId);
  if (!user) {
    console.error("User not found");
    return res.status(400).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
  }
  const exercises = await selectExercisesByUserId(db, userId);

  const { from, to, limit } = queryParams;

  const filteredExercises =
    from || to || limit
      ? filterExercises(from, to, limit, exercises)
      : exercises;

  const log = {
    username: user.username,
    _id: user._id,
    count: filteredExercises.length,
    log: filteredExercises.map((ex) => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date,
    })),
  };

  res.json(log);
};

export { addUser, getUsers, addExercise, getUserLogs };
