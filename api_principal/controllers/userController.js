const User = require("../models/users");

const getUserProfile = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    preferences: user.preferences,
  });
};

const updateUserProfile = async (req, res) => {
  const user = req.user;
  const { name, email, preferences } = req.body;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    user.name = name || user.name;
    user.email = email || user.email;
    user.preferences = preferences || user.preferences;

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      preferences: updatedUser.preferences,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
