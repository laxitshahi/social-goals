/* Middleware?
    - Middleware(s) are functions that execute during the request, response cycle; when you make a req */

//Default error handler gives html page
//passing in err overrides default errorHandler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  //if a status code has been set previously in the controller, then set statusCode to that, else 500(internal server error)

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //Gives info s.a. line numbers
    /*Stack Trace: Gives addition information
        - Only want this information in production*/
  });
};

module.exports = {
  errorHandler,
};
