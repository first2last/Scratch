// middlewares/isLoggedIn.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    // Initialize guest cart if not exists
    if (!req.session.guestCart) {
        req.session.guestCart = [];
    }

    // Check for authentication token
    if (req.cookies.token) {
        try {
            // Verify JWT token
            const decoded = jwt.verify(
                req.cookies.token,
                process.env.JWT_KEY
            );

            // Find user and exclude password
            const user = await userModel.findOne({ email: decoded.email })
                .select("-password");

            if (!user) {
                req.flash("error", "User not found");
                return res.redirect("/register");
            }

            // Attach user to request
            req.user = user;

            // Merge guest cart with user cart if exists
            if (req.session.guestCart?.length > 0) {
                const uniqueItems = [...new Set([
                    ...user.cart.map(id => id.toString()),
                    ...req.session.guestCart
                ])];

                user.cart = uniqueItems;
                await user.save();
                req.session.guestCart = [];
            }

        } catch (err) {
            console.error("Auth Middleware Error:", err);
            req.flash("error", "Session expired - please login again");
            res.clearCookie("token");
            return res.redirect("/register");
        }
    }

    if (!req.user) {
        req.user = null; // So templates can check easily
    }
    // Proceed to next middleware/route

    // Add this at the end of the middleware
    res.locals.currentUser = req.user || null;

    next();
};