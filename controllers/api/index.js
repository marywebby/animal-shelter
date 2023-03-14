const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const animalRoutes = require('./animal-routes')

router.use('/users', userRoutes);
router.use('/animal', animalRoutes)

module.exports = router;
