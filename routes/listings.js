const express = require('express');
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const { index, renderNewForm, createListing, editListing, updateListing, destroyListing, showListing, } = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
  .get(index)// Index route
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, createListing); // Create route

// New route
router.get("/new", isLoggedIn, renderNewForm);

router.route("/:id")
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, updateListing) // Update route
  .delete(isLoggedIn, isOwner, destroyListing) // Delete route
  .get(showListing); // Show route


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, editListing);



module.exports = router;