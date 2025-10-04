const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if(!username || !password){
      return res.status(400).json({message:"Username and password are required"});
    }
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Login failed" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_TOKEN, {
      expiresIn: "30m",
    }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/refresh",
    })
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15min 
    });
    return res.json({ userId: user.id, username: username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};
const authToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" })
    }
    req.user = decoded;
    next();
  }); 

};
/*
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
*/
const getProtectedData = (req, res) => {
  res.json({
    message:"This is protected data",
    user:req.user
  }); 
}; 

const refeshEndpoint = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refesh token' });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refesh token' });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId},
      process.env.JWT_TOKEN,
      { expiresIn: '15min' }
    );

    res.cookie('acessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.json({ message: 'Token refreshed successfully' });

  })
}

const logOut = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken', { path: "/api/refresh" });
  res.json({ message: "Logged out successfully " })
}

module.exports = {
  authToken,
  login,
  refeshEndpoint,
  logOut,
  getProtectedData
};
