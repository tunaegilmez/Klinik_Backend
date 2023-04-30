import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_CODE);
    if (decoded) req[decoded.type] = decoded;

    return next();
  } catch (err) {
    return next();
  }
};
