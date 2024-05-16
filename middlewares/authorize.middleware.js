const { UnauthorizedError } = require('../errors/unauthorized.error');

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Access Denied');
    }
    next();
  };
}

module.exports = authorize;
