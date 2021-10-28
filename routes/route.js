const express = require('express');
const {
  createUser,
  getUsers,
  userUpdate,
  deleteUser,
  getUser,
} = require('../controllers/crud');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', userUpdate);
router.delete('/:id', deleteUser);

module.exports = router;
