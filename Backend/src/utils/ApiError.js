class ApiError extends Error {
    constructor(
      statusCode,
      message = "Something went Wrong",
      errors = [],
      stack = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
}

class ValidationError extends ApiError {
    constructor(message = "Validation Error", errors = []) {
        super(400, message, errors);
        this.name = "ValidationError";
    }
}

class AuthenticationError extends ApiError {
    constructor(message = "Authentication Failed", errors = []) {
        super(401, message, errors);
        this.name = "AuthenticationError";
    }
}

class AuthorizationError extends ApiError {
    constructor(message = "Access Denied", errors = []) {
        super(403, message, errors);
        this.name = "AuthorizationError";
    }
}

class NotFoundError extends ApiError {
    constructor(message = "Resource Not Found", errors = []) {
        super(404, message, errors);
        this.name = "NotFoundError";
    }
}

class ConflictError extends ApiError {
    constructor(message = "Resource Conflict", errors = []) {
        super(409, message, errors);
        this.name = "ConflictError";
    }
}

class DatabaseError extends ApiError {
    constructor(message = "Database Operation Failed", errors = []) {
        super(500, message, errors);
        this.name = "DatabaseError";
    }
}

class ExternalApiError extends ApiError {
    constructor(message = "External API Error", errors = []) {
        super(502, message, errors);
        this.name = "ExternalApiError";
    }
}

class RateLimitError extends ApiError {
    constructor(message = "Rate Limit Exceeded", errors = []) {
        super(429, message, errors);
        this.name = "RateLimitError";
    }
}

class MovieNotFoundError extends NotFoundError {
    constructor(movieId = null) {
        const message = movieId ? `Movie with ID ${movieId} not found` : "Movie not found";
        super(message);
        this.name = "MovieNotFoundError";
        this.movieId = movieId;
    }
}

class UserNotFoundError extends NotFoundError {
    constructor(userId = null) {
        const message = userId ? `User with ID ${userId} not found` : "User not found  buddy6";
        super(message);
        this.name = "UserNotFoundError";
        this.userId = userId;
    }
}

class InvalidCredentialsError extends AuthenticationError {
    constructor(message = "Invalid email or password") {
        super(message);
        this.name = "InvalidCredentialsError";
    }
}

class TokenExpiredError extends AuthenticationError {
    constructor(message = "Token has expired") {
        super(message);
        this.name = "TokenExpiredError";
    }
}

class InvalidTokenError extends AuthenticationError {
    constructor(message = "Invalid token") {
        super(message);
        this.name = "InvalidTokenError";
    }
}

class DuplicateEmailError extends ConflictError {
    constructor(email) {
        super(`User with email ${email} already exists`);
        this.name = "DuplicateEmailError";
        this.email = email;
    }
}

class DuplicateMovieError extends ConflictError {
    constructor(title) {
        super(`Movie with title "${title}" already exists`);
        this.name = "DuplicateMovieError";
        this.title = title;
    }
}

export {
    ApiError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ConflictError,
    DatabaseError,
    ExternalApiError,
    RateLimitError,
    MovieNotFoundError,
    UserNotFoundError,
    InvalidCredentialsError,
    TokenExpiredError,
    InvalidTokenError,
    DuplicateEmailError,
    DuplicateMovieError
}
  