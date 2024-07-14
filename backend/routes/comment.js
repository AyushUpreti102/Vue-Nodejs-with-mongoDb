// routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const Comments = require('../models/comments'); // Adjust the path based on your project structure

// Middleware
router.use(express.json());

// Route: GET /api/data
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comments.findById(req.params.id);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
