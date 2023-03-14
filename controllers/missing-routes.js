const express = require('express');
const router = express.Router();
const animals = require('../models/animal');

router.get('/missing', (req, res) => {
  const missingAnimals = animals.filter(animal => animal.isMissing);
  res.render('missing', { animals: missingAnimals });
});

module.exports = router;