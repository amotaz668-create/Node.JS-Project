const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File", file);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `User-${Date.now()}.${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  return cb(appError.create("Only image files are allowed", 400, "Fail"), false);
};

const upload = multer({
  storage: diskStorage,
  fileFilter
});

const usersController = require("../controllers/users_controller");
const appError = require("../utils/appError");

const router = express.Router();

router.route("/")
  .get(verifyToken, usersController.getAllUsers)

router.route("/register")
  .post(upload.single("avatar"), usersController.register)
  
router.route("/login")
  .post(usersController.login);

module.exports = router;
