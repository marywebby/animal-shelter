const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Post, User, Comment } = require('../models');
const { User, Animal } = require('../models');
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
  res.redirect('/featured');
});

router.get('/featured', async (req, res) => {
  try {
    // Get one random dog and one random cat from the Animal model where isMissing is false
    const animals = await Animal.findAll({
      where: {
        isMissing: false,
        animal: {
          [Op.or]: [true, false],
        },
      },
    });
    const dogs = animals.filter((animal) => animal.animal === true);
    const cats = animals.filter((animal) => animal.animal === false);
    const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
    const randomCat = cats[Math.floor(Math.random() * cats.length)];

    // Render the featured page with the data for the random dog and cat
    res.render('featured', {
      randomDog: {
        name: randomDog.name,
        photo: randomDog.photo,
        age: randomDog.age,
        breed: randomDog.breed,
        sex: randomDog.sex,
        hypoallergenic: randomDog.hypoallergenic,
      },
      randomCat: {
        name: randomCat.name,
        photo: randomCat.photo,
        age: randomCat.age,
        breed: randomCat.breed,
        sex: randomCat.sex,
        hypoallergenic: randomCat.hypoallergenic,
      },
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
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