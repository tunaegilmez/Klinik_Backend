import jwt from "jsonwebtoken";

function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).send("Erişim reddedildi. Yetki bulunamadı.");
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN---", token);

  if (!token) {
    return res.status(401).send("Erişim reddedildi. Token bulunamadı.");
  }

  jwt.verify(token, process.env.JWT_CODE, (err, decoded) => {
    if (err) {
      return res.status(401).send("Erişim reddedildi. Geçersiz token.");
    }

    if (decoded.type !== "admin") {
      return res
        .status(403)
        .send("Erişim reddedildi. Bu işlem için yetkiniz yok.");
    }

    req.user = decoded;
    next();
  });
}

export default isAdmin;
