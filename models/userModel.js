const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

userSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
