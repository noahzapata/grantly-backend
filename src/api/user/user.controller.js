const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const { signUp, signIn, listOfUsers } = require('./user.service');
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

    return res.status(200).json({ message: 'Login successfully', data: token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was an error loggin in', error: error.message });
  }
};

const listOfUsersHandler = async (req, res) => {
  try {
    const user = await listOfUsers();
    res.status(200).json({ message: 'users found', data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error while looking for users', error: error.message });
  }
};

module.exports = { signUpHandler, signInHandler, listOfUsersHandler };
