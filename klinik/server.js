import express from "express";
import router from "./modules/routes.js";
import cors from "cors";
import db from "./db.js";
import userRouter from "./modules/user/routes.js";
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

db.on("connected", () => {
  console.log("mongo connected");
  app.listen(port, () => {
    console.log(`Klinik app listening on port ${port}`);
  });
});

router(app);
