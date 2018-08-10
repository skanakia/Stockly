const passport = require("passport");
const cookieparser = require('cookie-parser');
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session")
const db = require("../models");

module.exports = (app) => {
    app.use(cookieparser());
    app.use(session({
        secret: 'frazzle rock',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'one',
        cookie: {
            httpOnly: true,
            maxAge: 20 * 60 * 1000
        }
    }));




    passport.use(new LocalStrategy(
        (email, password, done) => {
            db.User.findOne({ email: email })
                .then((dbUser) => {
                    if (!dbUser) {
                        return done(null, false, {
                            message: "Incorrect email."
                        });
                    }
                    return dbUser.validatePassword(password)
                        .then(isMatch => done(null, isMatch ? dbUser : false, isMatch ? null : { message: "incorrect email" }))
                })
                .catch(done);
        }));

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    });

    passport.deserializeUser((userID, cb) => {
        db.User.findById(userID)
            .then(user => {
                cb(null, user);
            })
            .catch((err) => {
                cb(err)
            })
    });

    app.use(passport.initialize());
    app.use(passport.session());


    module.exports = passport;
}