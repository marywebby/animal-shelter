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

// Handle form submission
router.post('/postMissing', async (req, res) => {
  try {
    // Create a new record in the Animal model with the information submitted by the user
    const animal = await Animal.create({
      name: req.body['pet-name'],
      animal: req.body['pet-type'] === 'dog',
      breed: req.body['pet-breed'],
      age: parseInt(req.body['pet-age']),
      hypoallergenic: req.body['pet-allergies'] === 'no',
      sex: req.body['pet-sex'] === 'female',
      isMissing: true,
      lastSeen: req.body['last-seen'],
    });
    // Redirect the user to the missing page with their missing animal displayed
    res.redirect('/missing');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
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