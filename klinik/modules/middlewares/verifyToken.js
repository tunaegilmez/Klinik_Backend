import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    console.log("2222222");
    res.status(401).send("Access denied. No token provided");
    return;
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_CODE, (error, decoded) => {
    if (error) {
      res.status(401).send("Invalid token");
      return;
    }

    req.userId = decoded._id;

    next();
  });
};
