const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("Error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({ email: email })
            .select("-password");

        req.user = user;

        next();
    } catch (err) {
        req.flash("Error", "Something went wrong");
        res.redirect("/");
    }
};
