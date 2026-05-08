const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const appError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT ");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 100;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, users: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log("req.file:", req.file);
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res
      .status(409)
      .json({ status: httpStatusText.ERROR, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  // generate JWT token
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.tokens = token;

  await newUser.save();
  res.status(201).json({ status: httpStatusText.CREATED, user: { newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "Email and password are required",
      404,
      httpStatusText.FAIL,
    );
    return next(error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = appError.create("User not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    user.tokens = token;
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = appError.create(
      "Invalid email or password",
      500,
      httpStatusText.ERROR,
    );
    return next(error);
  }
});
module.exports = {
  getAllUsers,
  register,
  login,
};
