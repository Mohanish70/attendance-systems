const errorMiddleware = (err, req, res, next) => {
  console.error(`Error occurred on ${req.method} ${req.path}:`, err.stack);

  const isProduction = process.env.NODE_ENV === 'production';
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = isProduction ? 'Invalid input' : Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle MongoDB Duplicate Key Error
  if (err.code && err.code === 11000) {
    statusCode = 409;
    message = isProduction ? 'Duplicate value' : `Duplicate value for field: ${Object.keys(err.keyValue)}. Please use a different value.`;
  }

  // Handle JWT Authorization Errors
  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Invalid token. Authorization denied.';
  }

  // Handle Bad JSON Error (Syntax Error)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON payload';
  }

  // Handle Custom Errors
  if (err.isCustomError) {
    statusCode = err.statusCode || 500;
    message = err.message || 'An error occurred';
  }

  // Always send a response
  res.status(statusCode).json({ message });
};

module.exports = errorMiddleware;
