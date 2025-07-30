const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");

    if (users.length === 0 || !users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ messsage: "Usuarios encontrados", users });
  } catch (err) {}
};

module.exports = {
  getUsers,
};
