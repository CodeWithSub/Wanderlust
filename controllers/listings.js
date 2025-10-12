const Listing = require('../models/listing');
const mongoose = require('mongoose')

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs")
};

module.exports.createListing = async (req, res) => {
  let listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  // Geocode the location
  if (req.body.listing.location) {
    const address = req.body.listing.location;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    listing.geometry = {
      type: "Point",
      coordinates: [0, 0] // Default coordinates
    };
    if (data.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: [data[0].lon, data[0].lat]
      };
    }
  }
  await listing.save();
  req.flash("success", "New listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 404, message: "Invalid listing ID" });
  }
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are requested for doesn't exist");
    res.redirect("/listings")
  } else {
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  }
};

module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 404, message: "Invalid listing ID" });
  };

  let listing = req.body.listing;
  if (req.body.listing.location) {
    const address = req.body.listing.location;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    listing.geometry = {
      type: "Point",
      coordinates: [0, 0] // Default coordinates
    };
    if (data.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: [data[0].lon, data[0].lat]
      };
    }
  }
  const finalListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true });

  if (req.file) {
    finalListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await finalListing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`)
};

module.exports.destroyListing = async (req, res, next) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 404, message: "Invalid listing ID" });
  }
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!")
  res.redirect("/listings")
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 404, message: "Invalid listing ID" });
  }
  const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner").select("+geometry");
  if (!listing) {
    req.flash("error", "Listing you are requested for doesn't exist");
    res.redirect("/listings")
  } else {
    res.render("listings/show.ejs", { listing });
  }
}