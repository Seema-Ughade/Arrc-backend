const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
// create user
router.post('/users', upload.single('photo'), userController.createUser);

// get user by ID
router.get('/users/:id', userController.getUser);

// Get All Users
router.get('/users', userController.getAllUsers);

// Update User by ID
router.put('/users/:id', userController.updateUser);

// Update All Users
router.put('/users', userController.updateAllUsers);

// Delete User by ID
router.delete('/users/:id', userController.deleteUser);

// Delete All Users
router.delete('/users', userController.deleteAllUsers);

module.exports = router;
