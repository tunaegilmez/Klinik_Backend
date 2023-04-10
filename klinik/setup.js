import db from "./db.js";
import UserAdminModel from "./modules/user/model.js";
import { hashPassword } from "./modules/utilities/bcrypt.js";

const setup = async () => {
  try {
    console.log("--creating admin---");
    let password = await hashPassword("pv{D;R&&(q{&");

    let savedAdmin = await UserAdminModel.User.findOneAndUpdate(
      { email: "admin@admin.com" },
      {
        fullName: "admin",
        email: "admin@admin.com",
        password,
        role: "admin",
        isActive: true,
      },
      { upsert: true, new: true }
    );

    console.log("---successfully created admin---", savedAdmin);
    process.exit();
  } catch (err) {
    console.log("setup error", err);
  }
};

db.on("connected", async () => {
  console.log("Db connected for setup");
  setup();
});
