const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const gasRoute = require("./routes/gasStationRoute.js");
const paymentRoute = require("./routes/paymentRoute.js");

// const quantityRoute = require("./routes/quantityRoute.js");
const { dbconnect } = require("./database/dbconnection.js");


const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
dbconnect();

app.use((req, res, next) => {
    res.setHeader('Accesc-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept ,Authorization');
    res.setHeader('Access-Control_Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
})

app.use('/user',userRoute);
app.use('/order',orderRoute);
app.use('/fuel',gasRoute);
app.use('/payment',paymentRoute);

//app.use('/quantity', quantityRoute)

const PORT=process.env.PORT || 5001;

app.listen(PORT, (req, res) => {
    console.log(`Server started on port:${PORT}`)
})