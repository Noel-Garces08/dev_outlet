import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const createAdmin = asyncHandler(async (req, res) => {
    try {
        const user = await User.create({
            name: 'admin', email: 'admin@example.com', password: 'asdf', isAdmin: true,
        });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    } else {
        res.status(401).send(({ message: 'Invalid Email or Password' }));
    }
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(401).json({ message: 'User Exist Already' });
    }

    const user = await User.create({ name, email, password });

    if (!user) {
        res.status(401).send({ message: 'Invalid User Data' });
    } else {
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    }
});

const update = asyncHandler(async (req, res) => {
    console.log(req.user);
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findById(id);

    if (!user) {
        res.status(401).send({ message: 'User Not Found' });
    } else {
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) user.password = password;

        const updatedUser = await user.save();

        res.status(200).send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user),
        });
    }
});

export {
    createAdmin, signIn, register, update,
};
