import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routes/index.mjs";
import { usersRouter } from "./routes/users.mjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

export { app };
