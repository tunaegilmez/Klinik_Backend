import cors from "cors";
import express from "express";
import db from "./db.js";
import router from "./modules/routes.js";
import userRouter from "./modules/user/routes.js";
import eventRouter from "./modules/Event/routes.js";
import("dotenv/config");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/event", eventRouter);

db.on("connected", () => {
  console.log("mongo connected");
  app.listen(port, () => {
    console.log(`Klinik app listening on port ${port}`);
  });
});

router(app);
