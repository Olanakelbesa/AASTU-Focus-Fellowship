/**
 * Async Handler - Wraps async functions to handle errors automatically
 * Eliminates the need for try-catch blocks in controllers
 */

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
