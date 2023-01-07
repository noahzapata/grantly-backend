const Product = require('./product.model');

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const allProducts = async () => {
  return Product.find();
};

const findProduct = (productId) => {
  return Product.findById(productId);
};

const updateProduct = (productId, productData) => {
  return Product.findByIdAndUpdate(productId, productData, { new: true });
};

const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  allProducts,
  findProduct,
  updateProduct,
  deleteProduct,
};
