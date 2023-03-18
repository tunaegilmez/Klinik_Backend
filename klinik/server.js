import express from "express";
import router from "./modules/routes.js";
import cors from "cors";

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

import db from "./db.js";

db.on("connected", () => {
  console.log("mongo connected");
  app.listen(port, () => {
    console.log(`Klinik listening on port ${port}`);
  });
});

router(app);
