const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Post, User, Comment } = require('../models');
const { User} = require('../models');


router.get('/', (req, res) => {
  res.render('featured', {
    loggedIn: req.session.loggedIn,
    username: req.session.username})
});

router.get('/featured', (req, res) => {
  res.render('featured')
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/missing', (req,res) => {
  res.render('missing')
});

router.get('/postMissing', (req,res) => {
  if (req.session.loggedIn) {
    res.render('postMissing');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;