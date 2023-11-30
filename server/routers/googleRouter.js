const express = require("express");
const session = require('express-session');
const passport = require('passport');
const googleRouter = express.Router();
require('./auth.js')

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

googleRouter.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

googleRouter.get('/',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

googleRouter.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

googleRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

googleRouter.get('/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

module.exports = googleRouter;
