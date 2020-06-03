function errorHandler(err, req, res, next) {

  if(err.name === "JsonWebTokenError") {
    return res.status(400).json({
        status: 400,
        message: "INVALID TOKEN",
      });
  }
  else if (err instanceof Error) {
    return res.status(err.code).json({
        status: err.code,
        message: err.message,
      });
  } else {
    switch (err.code) {
    case 11000:
      return res.status(400).json({
        status: 400,
        message: "Database Validation: Email already exist",
      });

    case 400:
      return res.status(400).json({
        status: 400,
        message: `Database Validation: ${err.message}`,
      });

    case 404:
      return res.status(404).json({
        status: 404,
        message: `Database Validation: ${err.message}`,
      });

    default:
      if (err.errors.email) {
        return res.status(400).json({
          status: 400,
          message: `Database Validation: ${err.errors.email.properties.message}`,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Database Validation: Required Data not found ",
        });
      }
  }
  }
  
}

module.exports = errorHandler;