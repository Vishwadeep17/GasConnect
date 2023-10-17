const db = require("../models");
const User = db.user;

const getUserProfile = async (req, res) => {
  try {
    // Get user profile, including role information
    const user = await User.findById(req.userId).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var authorities = ["ROLE_" + user.roles[0].name.toUpperCase()];

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {getUserProfile}