import express from "express";
import { renderPage } from "../controllers/indexController.mjs";

const router = express.Router();

router.get("/", renderPage);

export { router as indexRouter };
