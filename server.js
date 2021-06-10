const express = require("express");
const connectDB = require("./db");
const router = require("./router");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// const PORT = process.env.PORT || 8000;
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Router

app.get("/", (_, res, next) => {
    res.redirect("/api");
    next();
});

app.use("/api", router);

connectDB()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Server up on PORT ${PORT}`);
});
