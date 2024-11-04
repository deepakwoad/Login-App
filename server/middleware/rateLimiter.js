const rateLimit = require("express-rate-limit");

const limit = rateLimit({
    window: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = limit;