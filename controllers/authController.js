const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    try {
        const { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "Already registered, please login.");
            return res.redirect("/");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({
            email,
            password: hashedPassword,
            fullname
        });

        let token = generateToken(user);
        res.cookie('token', token);
        req.flash("success", "Registration successful. Please login.");
        res.redirect("/");

    } catch (err) {
        console.log(err.message);
        req.flash("error", "Registration failed.");
        res.redirect("/");
    }
};

module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        req.flash("error", "Email or password incorrect.");
        return res.redirect("/");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
        const token = generateToken(user);
        res.cookie("token", token);
        req.flash("success", "Login successful.");
        res.redirect("/shop"); // redirect to a protected route
    } else {
        req.flash("error", "Email or password incorrect.");
        res.redirect("/");
    }
};


module.exports.logout = async function(req , res){
    res.cookie('token' , " ");
    res.redirect('/');
}
