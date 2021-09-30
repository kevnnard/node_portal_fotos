const { model } = require("mongoose");
const User = require("../models/User");

const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "grupoR_fox_replays@grupor.com" });

  if (userFound) return;

  const newUser = new User({
    username: process.env.ADMIN_NAME,
    email: "grupoR_fox_replays@grupor.com",
  });

  newUser.password = await newUser.encryptPassword(process.env.PASSWORD_ADMIN);

  const admin = await newUser.save();

  console.log("Usuario de Admin creado...", admin);
};

module.exports = createAdminUser();