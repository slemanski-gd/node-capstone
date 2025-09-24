import express from "express";
import { addUser, getUsers } from "../controllers/usersController.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  getUsers(req, res);
});
router.post("/", (req, res) => {
  addUser(req, res);
});

export { router as usersRouter };
