const { User } = require("../models/user");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password });
        return res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).send({ message: "Username doesn't exist" });
        }

        if (password !== user.password) {
            return res.status(400).send({ message: "Wrong Password" });
        }

        return res.status(200).send({ message: "Login successful" });
    } catch (error) {
        return res.status(500).send({ message: "Server error" });
    }
};
