const { Schema, model, models } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'The field "name" is required'],
    },
    lastName: {
      type: String,
      required: [true, 'The field "last name" is required'],
    },
    address: {
      type: Object,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      minLength: [6, 'The password too short'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'It is already exist a user with this email',
        },
      ],
    },
    profilePicture: {
      type: String,
      required: false,
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
      required: false,
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      required: false,
    },
    favs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      required: false,
    },
    shoppingHistory: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model('User', userSchema);

module.exports = User;
