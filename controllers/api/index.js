const router = require('express').Router();
const userRoutes = require('./user-routes');
const animalRoutes = require('./animal-routes');

router.use('/user', userRoutes);
router.use('/animal', animalRoutes);

module.exports = router;
