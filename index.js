require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const users = require("./routes/users");


const PORT = process.env.PORT || 5000;


mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useAndModift: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("DB up and running");
    })
    .catch(err => {
        console.log("Connection err" + err);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (res, err) => {
    res.send("<h1>Tutor Api</h1>")
})
app.use("/api", users);


app.listen(PORT, () => {
    console.log(`Is your server running? yes on ${PORT}`);
});

