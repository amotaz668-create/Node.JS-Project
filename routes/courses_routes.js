const express = require("express");
const allowedto = require("../middlewares/allowedTo");


const { body } = require("express-validator");
const coursesController = require("../controllers/courses_controller");
const validationSchema = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRole");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(verifyToken, allowedto(userRoles.ADMIN, userRoles.MANAGER), validationSchema(), coursesController.addCourse);

router
  .route("/:CourseId")
  .get(coursesController.getCourseById)
  .patch(verifyToken, allowedto(userRoles.ADMIN, userRoles.MANAGER), validationSchema(), coursesController.updateCourse)
  .delete(verifyToken, allowedto(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse);

module.exports = router;
