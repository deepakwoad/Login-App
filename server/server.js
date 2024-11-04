const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Security headers
app.use(helmet());

// Cross-origin resource sharing
app.use(cors());

// Body parser
app.use(express.json());

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/oauth', require('./routes/oauth')); // OAuth routes

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
