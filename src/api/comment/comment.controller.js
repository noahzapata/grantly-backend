const Product = require('../product/product.model');
const User = require('../user/user.model');
const Comment = require('./comment.model');

const {
  createComment,
  allComments,
  findComment,
  updateComment,
  deleteComment,
} = require('./comment.service');

const create = async (req, res) => {
  try {
    const { productId } = req.params;
    const commentData = req.body;
    const id = req.user;
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('The product does not exist');
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error('The user does not exist');
    }

    const comment = await createComment({
      ...commentData,
      user: id,
      product: productId,
    });
    user.comments.push(comment);
    product.comments.push(comment);

    await user.save({ validateBeforeSave: false });
    await product.save({ validateBeforeSave: false });
    return res.status(200).json({ message: 'Comment created', data: comment });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'The comment could not be created', data: err.message });
  }
};

const list = async (req, res) => {
  try {
    const comments = await allComments();
    return res.status(200).json({ message: 'comments found', data: comments });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'comments could not be found', data: err.message });
  }
};

const show = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await findComment(commentId);
    if (!comment) {
      throw new Error('The comment does not exist, or invalid id');
    }
    return res.status(200).json({ message: 'comment found', data: comment });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'comment could not be found', data: err.message });
  }
};

const update = async (req, res) => {
  const { commentId } = req.params;
  const commentData = req.body;
  try {
    const comment = await updateComment(commentId, commentData);
    return res.status(200).json({ message: 'comment Updated', data: comment });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'comment could not be updated', data: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { commentId } = req.params;
    const commentfind = await Comment.findById(commentId);

    if (!commentfind) {
      throw new Error('The comment does not exist, or invalid id');
    }

    const comment = await deleteComment(commentId);
    return res.status(200).json({ message: 'comment deleted', data: comment });
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'comment can not be deleted', data: err.message });
  }
};

module.exports = { create, list, show, update, destroy };
