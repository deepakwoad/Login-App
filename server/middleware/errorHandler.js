const logger = require("../utils/loggers");

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ message: 'Server error' });
};

module.exports = errorHandler;