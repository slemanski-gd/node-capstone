import express from "express";
import {
  addUser,
  getUsers,
  addExercise,
  getUserLogs,
} from "../controllers/usersController.mjs";

const router = express.Router();

/**
 * USERS ENDPOINTS:
 * get   /users - Retrieve all users
 * post  /users - Add a new user
 * post  /users/:_id/exercises - Add a new exercise for a user
 * get   /users/:_id/logs - Retrieve exercise logs for a user
 */

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.post("/", (req, res) => {
  addUser(req, res);
});

router.post("/:_id/exercises", (req, res) => {
  const userId = req.params._id;
  addExercise(req, res, userId);
});

router.get("/:_id/logs", (req, res) => {
  const userId = req.params._id;
  const queryParams = req.query;

  getUserLogs(req, res, userId, queryParams);
});

export { router as usersRouter };
