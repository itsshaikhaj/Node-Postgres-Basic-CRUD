const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Route to create a new user
router.post('/users', createUser);

// Route to get all users
router.get('/users', getUsers);

// Route to get a user by ID
router.get('/users/:id', getUserById);

// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
