import Model from "./model.js";
import { hashPassword, checkPassword } from "../utilities/bcrypt.js";
// import Jwt from "jsonwebtoken";

const getUserByEmail = async email => {
  // console.log(email);
  return Model.User.findOne({ email });
};

const signup = async (fullName, email, password) => {
  if (password) {
    password = await hashPassword(password);
  }

  let savedUser = await new Model.User({
    fullName,
    email,
    password,
  }).save();

  return savedUser;
};

const login = async (email, password) => {
  console.log(email + password, "email - pass");
  try {
    let userExists;

    if (email) {
      userExists = await getUserByEmail(email);
      console.log(userExists, "---UserExists---");
    }

    if (!userExists) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    console.log(userExists.password, "UserExists.Password---");
    let check = await checkPassword(userExists.password, password);

    if (!check) {
      throw new Error(
        JSON.stringify({
          en: "Wrong password.",
          tr: "Yanlış şifre.",
        })
      );
    }

    return {
      userId: userExists._id,
      username: userExists.email,
    };
  } catch (error) {
    console.log("login error", error.message);
    throw new Error(error.message);
  }
};

export default {
  signup,
  login,
};
