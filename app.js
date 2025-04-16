require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const expressSession = require('express-session');
const flash = require('connect-flash');

// MongoDB connection
const db = require("./config/mongoose-connection.js");

// Routers
const usersRouter = require('./routes/usersRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const shopRouter = require('./routes/shopRouter');
const homeRouter = require('./routes/homeRouter');
const registerRouter = require('./routes/registerRouter.js');

// Middlewares
const setUserFromToken = require('./middlewares/setUserFromToken');
const mergeGuestCart = require('./middlewares/mergeGuestCart');

// ---------- MIDDLEWARES SETUP ----------

// JSON, static files, and form data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Session (must come before flash and anything needing req.session)
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 30 // 30 minutes
    }
}));

// Flash messages
app.use(flash());

// Custom Middleware: Extract user from token (should come after session, before locals)
app.use(setUserFromToken);

// Guest cart setup (before routes that might use it)
app.use((req, res, next) => {
    if (!req.session.guestCart) req.session.guestCart = [];
    next();
});

// Merge guest cart with user cart (after user has been set)
app.use(mergeGuestCart);

// Set res.locals for views
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.currentUser = req.user || null;
    res.locals.cartCount = req.user?.cart?.length || req.session.guestCart?.length || 0;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// ---------- ROUTES ----------

app.set('view engine', "ejs");

app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);
app.use('/shop', shopRouter);
app.use('/home', homeRouter);

// Static page


// Default homepage
app.get('/', (req, res) => {
    res.render('index');
});

// ---------- START SERVER ----------
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
