const router = require('express').Router();
const postRoutes = require('./userRoutes');
const userRoutes = require('./thoughtRoutes');

router.use('/users', postRoutes);
router.use('/thoughts', userRoutes);

module.exports = router;
