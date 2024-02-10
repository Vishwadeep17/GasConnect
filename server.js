const express = require("express");
//const session = require("express-session");
var session = require('cookie-session');
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const passport = require("./config/passport.js");
const PORT = process.env.PORT || 3001;

//express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Passport configuration
app.use(session({ secret: process.env.SESSION_SECRET || "the cat ate my keyboard", resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

// connect to mongo database
mongoose.connect(process.env.DB_URI || "mongodb://localhost/fuelupdb", { useNewUrlParser: true, useUnifiedTopology: true });


//uses the route information on "routes/index.js"
app.use(routes);

// start server; react is listening on 3000, so need to use 3001
app.listen(PORT, () => console.log(`API Server now listening on PORT ${PORT}!`));