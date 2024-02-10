const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema({
    station: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

const Station = mongoose.model("Station", StationSchema);

module.exports = Station;