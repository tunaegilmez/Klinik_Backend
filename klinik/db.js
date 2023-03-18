import CONFIG from "./config.js";

import mongoose from "mongoose";

mongoose
  .connect(CONFIG.DATABASE.connection_url, {
    user: CONFIG.DATABASE.user,
    pass: CONFIG.DATABASE.password,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  })
  .catch(err => {
    console.error(err);
    console.error("Can't connect to Mongo");
  });

export default mongoose.connection;
