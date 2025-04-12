const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("Error", "You need to login first");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel
            .findOne({ email: decoded.email }) // 🔧 FIXED LINE
            .select("-password");

        if (!user) {
            req.flash("Error", "User not found");
            return res.redirect("/register");
        }

        req.user = user; // Attaching user to request
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        req.flash("Error", "Authentication failed");
        res.redirect("/register");
    }
};
