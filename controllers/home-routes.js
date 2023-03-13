const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Post, User, Comment } = require('../models');
const { User} = require('../models');


router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    username: req.session.username})
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;