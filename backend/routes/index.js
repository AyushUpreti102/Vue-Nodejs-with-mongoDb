const express = require('express');
const router = express.Router();

const commentRoutes = require('./comment');

router.use('/comments', commentRoutes);

module.exports = router;