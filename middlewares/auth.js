module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  },
  hasRole: function (role) {
    return function (req, res, next) {
      if (req.session.user && req.session.user.role === role) {
        return next();
      }
      res.status(403).send('Access denied.');
    };
  }
};