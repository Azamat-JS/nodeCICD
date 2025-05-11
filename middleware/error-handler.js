const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message) // Extract only the message from each validation error
      .join(", "); // Combine multiple messages into a single string
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle duplicate field errors (e.g., unique index constraints)
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue).join(", ")} field(s). Please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    customError.msg = `No item found with ID: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // Send the simplified error response
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
