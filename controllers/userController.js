const db = require("../models");
const passport = require("../config/passport.js");

module.exports = {
    create: (req, res) => {
        const user = new db.User(req.body);
        user.save((err, response) => {
            if (err) {
                console.log(err);
            }
            res.json(response);
        });
    },
    authenticate: (req, res) => {
        res.json(req.body);
    }
}