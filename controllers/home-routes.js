const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Post, User, Comment } = require('../models');
const { User, Animal } = require('../models');


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


router.get('/postMissing', (req,res) => {
  if (req.session.loggedIn) {
    res.render('postMissing');
  } else {
    res.redirect('/login');
  }
});

router.get('/missing', async (req, res) => {
  const missingAnimals = await Animal.findAll({
  }); 
  const animals = missingAnimals.map((animal) => animal.get({ plain: true }));
  console.log(animals);
  res.render('missing', { animals });
});


module.exports = router;