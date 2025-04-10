
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const path = require('path');
const db = require("./config/mongoose-connection.js");
const usersRouter = require('./routes/usersRouter.js');
const ownerRouter = require('./routes/ownerRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const shopRouter = require('./routes/shopRouter');

const expressSession = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


app.set('view engine', "ejs");
app.use('/products', productsRouter);
app.use('/owner', ownerRouter);
app.use('/users', usersRouter);

app.use('/shop', shopRouter);





app.get('/', function (req, res) {
    res.render('index');
})

app.listen(3000, function (req, res) {
    console.log("server running .....");

})
