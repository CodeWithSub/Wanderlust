const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main()
  .then(() => {
    // Connection successful
  })
  .catch((err) => {
    // console.log(err); // Log error if needed
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await initData.data.map((obj) => ({ ...obj, owner: "6550177c34d9b0d2f721200a" }));
  await Listing.insertMany(initData.data);
  // Data was initialized
};

initDB();