const express = require("express");
const mongoose = require("mongoose");
const body = require("body-parser");
const jwt = require("jsonwebtoken");
const userController = require("./controllers/userController");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    console.log(req.headers);
    if (
        req.headers &&
        req.headers.authorization &&
        (req.headers.authorization.split(" ")[0] === "JWT" || req.headers.authorization.split(" ")[0] === "Bearer")
    ) {
        let user = await jwt.verify(req.headers.authorization.split(" ")[1], "RESTFULAPI");
        console.log(user);
        if (user) {
            req.user = user;
        } else {
            req.user = undefined;
        }
    } else {
        req.user = undefined;
    }
    next();
});

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/auth", userController.loginRequired, (req, res) => {
    res.json({ data: req.user });
});
mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
        app.listen(3000, () => console.log("Server is running"));
    })
    .catch((err) => console.error(err));
