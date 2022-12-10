const {
  createProduct,
  allProducts,
  findProduct,
  updateProduct,
  deleteProduct,
} = require('./product.service');
const User = require('../user/user.model');

const create = async (req, res) => {
  try {
    const productData = req.body;
    const id = req.user;

    const user = await User.findById(id);
    const product = await createProduct({ ...productData, user: id });
    user.products.push(product);
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({ message: 'Pruduct created', data: product });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'The product could not be created', data: err.message });
  }
};

const list = async (req, res) => {
  try {
    const products = await allProducts();
    return res.status(200).json({ message: 'Products found', data: products });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Products could not be found', data: err.message });
  }
};

const show = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await findProduct(productId);
    if (!product) {
      throw new Error('The product does not exist, or invalid id');
    }
    return res.status(200).json({ message: 'Product found', data: product });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Product could not be found', data: err.message });
  }
};

const update = async (req, res) => {
  const { productId } = req.params;
  const productData = req.body;
  try {
    const product = await updateProduct(productId, productData);
    return res.status(200).json({ message: 'Product Updated', data: product });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Product could not be updated', data: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await deleteProduct(productId);
    return res.status(200).json({ message: 'Product deleted', data: product });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Product can not be created', data: err });
  }
};

module.exports = { create, list, show, update, destroy };
