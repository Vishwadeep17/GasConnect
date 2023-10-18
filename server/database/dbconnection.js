const mongoose = require("mongoose");

exports.dbconnect = async () => {
    mongoose.connect("mongodb://localhost:27017/GasConnect", { useNewUrlParser: true })
        .then(() => console.log("Mongodb started"))
        .catch((err) => console.log(err));
};
