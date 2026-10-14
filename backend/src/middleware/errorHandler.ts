import ApiError from "../utils/apiError";

const globalErrorHandler = (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  let error: any = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error("ERROR 💥:", err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ApiError(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
    error = new ApiError(400, message);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again";
    error = new ApiError(401, message);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please log in again";
    error = new ApiError(401, message);
  }

  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  res.status(statusCode).json({
    status,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
export { globalErrorHandler };