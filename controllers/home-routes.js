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
  res.render('featured', {
    loggedIn: req.session.loggedIn,
    username: req.session.username})
});

router.get('/login', (req, res) => {
  console.log(req.session, "LOGIN IS WORKING")
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/postMissing', (req,res) => {
  if (req.session.loggedIn) {
    res.render('postMissing', {
      loggedIn: req.session.loggedIn,
      username: req.session.username})
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('featured', {
    loggedIn: req.session.loggedIn,
    username: req.session.username})
});

router.get('/missing', async (req, res) => {
  const missingAnimals = await Animal.findAll({
  }); 
  const animals = missingAnimals.map((animal) => animal.get({ plain: true }));
  console.log(animals);
  res.render('missing', { animals, 
    loggedIn: req.session.loggedIn,
    username: req.session.username})
  
});


router.get('/adoption', async (req,res) => {
const where = {isMissing: false};
if (req.query.sex) {
  where.sex = req.query.sex === "true"
};
if (req.query.hypoallergenic) {
  where.hypoallergenic = req.query.hypoallergenic === "true"
}; 
if (req.query.animal) {
  where.animal = req.query.animal === "true"
}; 
const adoptionAnimals = await Animal.findAll({
  where
}); 
const animals = adoptionAnimals.map((animal) => animal.get({ plain: true }));
  res.render('adoption', {animals, 
    loggedIn: req.session.loggedIn,
    username: req.session.username
  })
});
// how to you enter more into the query string 


module.exports = router;