const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check if username is already in use
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Username is already in use.' });
      }

      // Check if email is already in use
      return User.findOne({ email: req.body.email });
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }

      // If neither username nor email is in use, move to the next middleware
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error.' });
    });
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;