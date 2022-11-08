const user = require('./api/user/user.route');

function routes(app) {
  app.use('/auth/local', user);
}

module.exports = routes;
