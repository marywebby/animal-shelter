const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');

router.use('/users', userRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;