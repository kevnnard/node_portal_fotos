
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("locals.error_msg", "No autorizado");
  res.redirect("/users/signin");
};

module.exports = helpers;
