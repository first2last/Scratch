const express = require('express');
const router = express.Router();
const Product = require('../models/product-model'); // Make sure your model file exports correctly
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');


router.get('/', isLoggedIn, async (req, res) => {
    try {
        const products = await Product.find();

        // Get user cart count
        const user = await userModel.findOne({ email: req.user.email });
        const cartCount = user && user.cart ? user.cart.length : 0;

        let success = req.flash('success');
        res.render('shop', { products, cartCount, success });
    } catch (err) {
        console.log(err.message);
        req.flash("error", "Could not load shop.");
        res.redirect("/");
    }
});


router.get('/cart', isLoggedIn, async function (req, res) {
    try {
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('cart');

        if (!user) {
            throw new Error("User not found");
        }

      
        const cartItems = user.cart.map(item => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        }));

        res.render('cart', { cart: cartItems });
    } catch (err) {
        console.error("Cart error:", err);
        req.flash("error", "Could not load cart.");
        res.redirect('/shop');
    }
});


router.get('/addToCart/:id', isLoggedIn, async function (req, res) {

    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.id);
    await user.save();



    req.flash("success", "Added to Cart");
    res.redirect('/shop');
})

router.get('/cart/remove/:id', isLoggedIn, async function (req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email });

        // Remove only the first instance of the product with matching ID
        const index = user.cart.indexOf(req.params.id);
        if (index > -1) {
            user.cart.splice(index, 1);
        }

        await user.save();

        req.flash("success", "Item removed from cart");
        res.redirect('/shop/cart');
    } catch (err) {
        console.error("Remove from cart error:", err);
        req.flash("error", "Could not remove item from cart.");
        res.redirect('/shop/cart');
    }
});

router.get('/cart/clear', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        user.cart = []; // Clear all items
        await user.save();

        req.flash("success", "All items removed from cart");
        res.redirect('/shop/cart');
    } catch (err) {
        console.error("Clear cart error:", err);
        req.flash("error", "Could not clear cart.");
        res.redirect('/shop/cart');
    }
});



module.exports = router;
