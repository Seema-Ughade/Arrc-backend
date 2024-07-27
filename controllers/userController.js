const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password,
            photo: req.file ? req.file.path : null
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const searchedUser = await User.findById(userId);

        if (!searchedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(searchedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
