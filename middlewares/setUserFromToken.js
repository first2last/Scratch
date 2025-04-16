const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await userModel.findById(decoded.id).select("-password");

            if (user) {
                req.user = user;

                // Merge guest cart into user's cart (avoid duplicates)
                if (req.session.guestCart?.length > 0) {
                    const uniqueItems = [...new Set([
                        ...user.cart.map(id => id.toString()),
                        ...req.session.guestCart
                    ])];

                    user.cart = uniqueItems;
                    await user.save();
                    req.session.guestCart = [];
                }
            }
        } catch (err) {
            console.error("setUserFromToken Error:", err);
            res.clearCookie("token");
            req.flash("error", "Session expired. Please login again.");
        }
    }

    next();
};
