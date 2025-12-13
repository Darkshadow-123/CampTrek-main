if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // avoids findAndModify warning
})
.then(() => console.log("MONGO CONNECTION OPEN!!!"))
.catch((err) => console.log("MONGO CONNECTION ERROR:", err));


    const app = express();

    app.engine('ejs', ejsMate)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'))
    
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));
    app.use(express.static(path.join(__dirname, 'public')))
    
    const store = MongoStore.create({
        mongoUrl: dbUrl,
        collectionName: 'sessions',
        secret: process.env.SECRETE,
        touchAfter: 24 * 60 * 60
    });
    store.on('error', function (e) {
        console.log('SESSION STORE ERROR', e);
    });

    
    app.use(session({
        store,
        name: 'session',
        secret: process.env.SECRETE,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    
    app.use(flash());
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use((req, res, next) => {
        console.log(req.session)
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    })
    
    
    app.use('/', userRoutes);
    app.use('/campgrounds', campgroundRoutes)
    app.use('/campgrounds/:id/reviews', reviewRoutes)
    
    
    app.get('/', (req, res) => {
        res.render('home')
    });
    
    
    app.all('*', (req, res, next) => {
        next(new ExpressError('Page Not Found', 404))
    })
    
    app.use((err, req, res, next) => {
        const { statusCode = 500 } = err;
        if (!err.message) err.message = 'Oh No, Something Went Wrong!'
        res.status(statusCode).render('error', { err })
    })
    
    app.listen(3000, () => {
        console.log('Serving on port 3000')
    })