const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils/errorMiddleware");

exports.loginRequired = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        return next();
    } else {
        return res.status(401).json({
            message: "Unauthorized user!",
        });
    }
};

exports.register = catchAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({ message: "success", data: newUser });
});

exports.login = catchAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.comparePassword(req.body.password, user.password)) {
        return res.status(201).json({
            message: "success",
            data: user,
            token: jwt.sign({ email: user.emai, username: user.username, _id: user._id }, "RESTFULAPI", {
                expiresIn: "1h",
            }),
        });
    }
    return res.status(401).json({ message: "Authentication failed.No user found" });
});
