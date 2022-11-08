const User = require('./user.model');

const signUp = (user, encPassword) => {
  return User.create({ ...user, password: encPassword });
};

const signIn = (email) => {
  return User.findOne({ email });
};

const listOfUsers = () => {
  return User.find();
};

module.exports = { signUp, signIn, listOfUsers };
