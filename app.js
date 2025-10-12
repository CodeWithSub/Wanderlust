if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js')

// Routes
const listingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');

const dbUrl = process.env.ATLAS_DB_URL

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB connected");

    // Start Express only after DB connection
    app.listen(8080, () => console.log("Server running on port 8080"));
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

main();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


app.use(cookieParser());


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});

store.on("error", (err) => {
  // console.log("Error in MONGO SESSION STORE", err);
})

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// Listing Router
app.use("/listings", listingRouter);

// Review Router
app.use("/listings/:id/reviews", reviewRouter);

// User Router
app.use("/", userRouter)

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render('error.ejs', { errMsg: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    console.warn("⚠️ Validation Error:", err.message);
    err.status = 400;
  }

  console.error("❌ Error:", err);
  const status = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(status).render('error.ejs', { errMsg });
});


