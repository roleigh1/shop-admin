const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Login failed" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", userId: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = {
  login,
  register,
};
