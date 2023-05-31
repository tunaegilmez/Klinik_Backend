import Model from "./model.js";
import { hashPassword, checkPassword } from "../utilities/bcrypt.js";
import Jwt from "jsonwebtoken";

const getUserByEmail = async email => {
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
  try {
    let userExists;

    if (email) {
      userExists = await getUserByEmail(email);
    }

    if (!userExists) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let check = await checkPassword(userExists.password, password);

    if (!check) {
      throw new Error(
        JSON.stringify({
          en: "Wrong password.",
          tr: "Yanlış şifre.",
        })
      );
    }

    const token = Jwt.sign(
      {
        type: userExists?.role,
        _id: userExists?._id?.toString(),
        email: userExists?.email,
        fullName: userExists?.fullName,
      },
      process.env.JWT_CODE
    );

    return {
      token,
      userId: userExists._id,
      email: userExists.email,
      fullName: userExists.fullName,
    };
  } catch (error) {
    console.log("login error", error.message);
    throw new Error(error.message);
  }
};

const getUser = async (limit, skip) => {
  let users = await Model.User.find(
    {},
    {},
    { limit, skip, sort: { fullName: 1 } }
  );
  let count = await Model.User.countDocuments({});
  return { users, count };
};

const getUserById = async userId => {
  return Model.User.findById(userId);
};

const updateUserActive = async userId => {
  return Model.User.findByIdAndUpdate(
    userId,
    {
      $set: { isActive: true },
    },
    { new: true }
  );
};

const updatedUserPayment = async userId => {
  return Model.User.findByIdAndUpdate(
    userId,
    {
      $set: { isPaid: true },
    },
    { new: true }
  );
};

const addPackageType = async (userId, packageType) => {
  return Model.User.findByIdAndUpdate(
    userId,
    {
      $set: { packageType },
    },
    {
      new: true,
    }
  );
};

export default {
  signup,
  login,
  getUser,
  getUserById,
  updateUserActive,
  updatedUserPayment,
  addPackageType,
};
