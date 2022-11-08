const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: Object,
      required: false,
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      required: false,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cart = model('Cart', cartSchema);
module.exports = Cart;
