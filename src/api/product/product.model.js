const { Schema, model } = require('mongoose');
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fav: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: [String],
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
      required: false,
    },
    details: {
      type: Object,
      required: false,
    },
    tags: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    addressOrigin: {
      type: Object,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model('Product', productSchema);
module.exports = Product;
