const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, (email, password, done) => {
    db.User.findOne({ email }).then(response => {
        if (!response) {
            console.log("wrong");
            return done(null, false, { message: "Incorrect Email or Password"});
        } else {
            return response.checkPassword(password).then(isCorrect => {
                if(!isCorrect){
                    return done(null, false, { message: "Incorrect Email or Password"}) // we don't specify for security sake
                } else {
                    // All good, proceed
                    return done(null, response);
                }
            });
        }
    }).catch(err => console.log(err));
}))

passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    db.User.findById(user._id, (err, user) => {
        done(err, user);
    })
})

module.exports = passport;