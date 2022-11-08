const user = require('./api/user/user.route');
const comment = require('./api/comment/comment.route');
const cart = require('./api/cart/cart.route');
const product = require('./api/product/product.route');

function routes(app) {
  app.use('/api/auth/local', user);
  // app.use('/api/users',user)
  app.use('/api/comments', comment);
  app.use('/api/carts', cart);
  app.use('/api/products', product);
}

module.exports = routes;
