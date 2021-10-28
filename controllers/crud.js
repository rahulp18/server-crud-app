const User = require('../models/crud');
const mongoose = require('mongoose');

// Create A User
const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

// Get all Usrs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

// Find User by id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

// Update User
const userUpdate = async (req, res) => {
  const { id } = req.params;

  const { name, email, password, message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id :${id}`);

  const updateUser = { name, email, password, message, _id: id };

  await User.findByIdAndUpdate(id, updateUser, { new: true });
  res.json(updateUser);
};
// Delete User

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id :${id}`);
  await User.findByIdAndRemove(id);
  res.status(201).json({ message: 'Post Deleted Successfully' });
};

module.exports = {
  createUser,
  getUsers,
  userUpdate,
  deleteUser,
  getUser,
};
