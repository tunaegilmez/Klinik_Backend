import Service from "./service.js";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let addedUser = await Service.signup(fullName, email, password);
    return res.json({ status: true, ...addedUser._doc });
  } catch (error) {
    console.log("SIGNUP error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.json({
      status: false,
      message: JSON.stringify({
        en: "email or password should send with request.",
        tr: "email veya password gönderilmeli.",
      }),
    });
  }
  try {
    let login = await Service.login(email, password);

    return res.json({
      status: true,
      ...login,
    });
  } catch (error) {
    console.log(error.message, "login error");
    return res.json({ status: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  let { limit, skip } = req.query;

  limit = !limit ? 10 : limit;
  skip = !skip ? 0 : skip;
  try {
    let foundUsers = await Service.getUser(limit, skip);

    return res.json({
      status: true,
      users: foundUsers.users, // BURAYI KONTROL ET !!!!!!!
      count: foundUsers.count,
    });
  } catch (error) {
    console.log("getUser error", error.message);
  }
};

const getUserById = async (req, res) => {
  let { userId } = req.params;

  try {
    let user = await Service.getUserById(userId);

    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    console.log("getUserById error", error.message);
  }
};

export default {
  signup,
  login,
  getUsers,
  getUserById,
};
