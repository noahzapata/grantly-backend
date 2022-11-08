const Cart = require('./cart.model');

const createCart = async (data, userId) => {
  return await Cart.create({ ...data, user: userId });
};

const getCart = () => {
  return Cart.find({});
};

const getCartById = (id) => {
  return Cart.findById(id);
};

const updateCart = (id, data) => {
  return Cart.findByIdAndUpdate(id, data, { new: true });
};

const deleteCart = (id) => {
  return Cart.findByIdAndDelete(id);
};

module.exports = { createCart, getCart, getCartById, updateCart, deleteCart };
