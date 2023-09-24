const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate that password is a non-empty string
  if (typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required.' });
  }

  try {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    // Assign a fixed role during registration (e.g., "user")
    const defaultRole = await Role.findOne({ name: "user" });
    user.roles = [defaultRole._id];

    await user.save();

    res.status(201).json({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          expiresIn: 86400, // 24 hours
        }
      );

      // Assign fixed roles as needed (e.g., "user", "supplier", "admin")
      var authorities = ["ROLE_" + user.roles[0].name.toUpperCase()];

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
