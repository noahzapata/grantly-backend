const Comment = require('./comment.model');

const createComment = async (data) => {
  return await Comment.create(data);
};

const allComments = async () => {
  return Comment.find({});
};

const findComment = (id) => {
  return Comment.findById(id);
};

const updateComment = (id, data) => {
  return Comment.findByIdAndUpdate(id, data, { new: true });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

module.exports = {
  createComment,
  allComments,
  findComment,
  updateComment,
  deleteComment,
};
