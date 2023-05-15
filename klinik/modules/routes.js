import userRouter from "./user/routes.js";
import eventRouter from "./Event/routes.js";

export default app => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
};
