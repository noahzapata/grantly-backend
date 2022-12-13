const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const {
  signUp,
  signIn,
  oneUser,
  listOfUsers,
  updatePhotoUser,
  deleteUser,
  findProducts,
  findFavs,
} = require('./user.service');
const { transporter, welcome } = require('../../utils/mailer');

const signUpHandler = async (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  try {
    const existingUser = await User.find({ email });
    if (!existingUser) {
      throw new Error('User already exists');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    const encodePassword = await bcrypt.hash(password, 8);
    const user = await signUp(userData, encodePassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    await transporter.sendMail(welcome(user));
    return res
      .status(201)
      .json({ message: 'User created successfully', data: { user, token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'User could not be created', error: error.message });
  }
};

const signInHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await signIn(email);
    if (!user) {
      throw new Error(`Some credentials are invalid`);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(`Some credentials are invalid `);
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });

    return res
      .status(200)
      .json({ message: 'Login successfully', data: { token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was an error loggin in', error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const user = await listOfUsers();
    res.status(200).json({ message: 'users found', data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error while looking for users', error: error.message });
  }
};

async function show(req, res) {
  const userId = req.user;
  try {
    const user = await oneUser(userId);
    return res.status(200).json({ message: 'User found', data: user });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User not found', data: err.message });
  }
}

async function update(req, res) {
  const userData = req.body;
  try {
    const userUdated = await updatePhotoUser(userData);
    return res.status(200).json({ message: 'User updated', data: userUdated });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not been update', data: err });
  }
}

async function destroy(req, res) {
  const { userId } = req.params;
  try {
    const userDeleted = await deleteUser(userId);
    return res.status(200).json({ message: 'User deleted', data: userDeleted });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could no be deleted', data: err });
  }
}

const findUserProducts = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findProducts(email);
    return res.status(200).json({ message: 'User flights found', data: user });
  } catch (err) {
    return res.status(400).json({ message: 'User not found', data: err });
  }
};
const findUserFavs = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findFavs(email);
    return res.status(200).json({ message: 'User flights found', data: user });
  } catch (err) {
    return res.status(400).json({ message: 'User not found', data: err });
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
  list,
  show,
  update,
  destroy,
  findUserProducts,
  findUserFavs,
};
