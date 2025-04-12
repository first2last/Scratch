
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const path = require('path');
const db = require("./config/mongoose-connection.js");
const usersRouter = require('./routes/usersRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const shopRouter = require('./routes/shopRouter');
const homeRouter = require('./routes/homeRouter');
const registerRouter = require('./routes/registerRouter.js');
const expressSession = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    expressSession({
        resave: true,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
        cookie: {
            secure: false, // For development
            maxAge: 1000 * 60 * 30 // 30 minutes
        }
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    next();
});

app.use('/users', usersRouter);
app.use('/register', registerRouter);


app.set('view engine', "ejs");

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/register' , registerRouter);
app.use('/shop', shopRouter);
app.use('/home' , homeRouter);







// Add this static route handler
app.get('/about', (req, res) => {
    res.render('about');
});

// Keep this as the last route
app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000, function (req, res) {
    console.log("server running .....");

})
