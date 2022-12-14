const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
