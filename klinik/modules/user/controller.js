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

export default {
  signup,
  login,
};
