const morgan = require("morgan");
const pino = require("pino");

const logger = pino(); // Initialize pino logger

// Create a writable stream for morgan that uses the pino logger
logger.stream = {
  write: function (message) {
    logger.info(message.trim()); // Log message using pino
  },
};

// Export morgan middleware, configured to use the pino stream
module.exports = morgan("combined", { stream: logger.stream });
