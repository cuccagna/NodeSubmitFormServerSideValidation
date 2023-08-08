const authorize = (req, res, next) => {
  if (!res.locals.path404) {
    console.log("authorize");
  }
  next();
};

module.exports = authorize;
