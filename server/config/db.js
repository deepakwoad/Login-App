const mongoose = require("mongoose");
const logger = require("../utils/loggers")

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URI);
        logger.info("MongoDB connect");
    }catch (err) {
        logger.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;