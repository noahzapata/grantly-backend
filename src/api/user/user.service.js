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
const oneUser = (id) => {
  return User.findById(id).populate({
    path: 'products',
  });
};
const deleteUser = (id) => {
  return User.findByIdAndRemove(id);
};

const findProducts = (email) => {
  return User.findOne({ email }).populate({
    path: 'products',
  });
};

const findFavs = (email) => {
  return User.findOne({ email }).populate({
    path: 'favs',
  });
};
const updatePhotoUser = async (data) => {
  const { email, profilePhoto } = data;
  const user = await User.findOne({ email });
  return await User.findByIdAndUpdate(
    user.id,
    { profilePhoto: profilePhoto },
    { new: true }
  );
};

module.exports = {
  signUp,
  signIn,
  findProducts,
  listOfUsers,
  deleteUser,
  updatePhotoUser,
  findFavs,
  oneUser,
};
