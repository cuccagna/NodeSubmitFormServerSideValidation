const logger = (req, res, next) => {
  if (!res.locals.path404) {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
  }
  next();
};
module.exports = logger;
