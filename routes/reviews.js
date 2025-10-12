const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { createReview, destroyReview } = require('../controllers/reviews');



// Add review
router.post("/", isLoggedIn, validateReview, createReview);

// Delete review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, destroyReview);

module.exports = router;