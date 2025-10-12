const Listing = require("./models/listing");
const Review = require("./models/review");

const { listingSchema, reviewSchema } = require('./schema.js');

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to perform this action!");
    res.redirect("/login")
  }
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};



module.exports.validateListing = (req, res, next) => {
  if (!req.body) {
    return next({ status: 400, message: "Please send some data" });
  }
  let { error } = listingSchema.validate(req.body);
  if (error) {
    const errorMsg = error.details.map((el) => el.message).join(",")
    next({ status: 400, message: errorMsg })
  } else {
    next()
  }
};

module.exports.validateReview = (req, res, next) => {
  if (!req.body) {
    return next({ status: 400, message: "Please send some data" });
  }
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    const errorMsg = error.details.map((el) => el.message).join(",")
    next({ status: 400, message: errorMsg })
  } else {
    next()
  }
}