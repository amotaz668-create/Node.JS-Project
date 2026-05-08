
const { validationResult} = require("express-validator");

const Course = require("../models/courses.model"); 

const httpStatusText = require("../utils/httpStatusText");

const asyncWrapper = require("../middlewares/asyncWrapper");

const appError = require("../utils/AppError");

const getAllCourses = asyncWrapper(
    async (req, res) => {
    const query = req.query;

    const limit = parseInt(query.limit) || 2;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, courses: { courses } });
});

const getCourseById = asyncWrapper(
  async (req, res, next) => {
    const course = await Course.findById(req.params.CourseId, { __v: false });

        if (!course) {
        const error = appError.create("Course not found", 404, httpStatusText.ERROR);
        return next(error);
    }

    return res.json({
      status: httpStatusText.SUCCESS,
      course: { course }
    });
});

const addCourse = asyncWrapper(
    async (req, res , next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create( errors.array(), 400, httpStatusText.FAIL);
            return next(error);
        }
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
    }
);

const updateCourse = asyncWrapper(
    async (req, res) => {
        const CourseId = req.params.CourseId;

    const updateCourse = await Course.updateOne({ _id: CourseId }, { $set: { ...req.body } });
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course: updateCourse } });

    res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: error.message});

});

const deleteCourse = asyncWrapper(
    async (req, res) => {
        await Course.deleteOne({ _id: req.params.CourseId });
        res
            .status(200)
            .json({ status: httpStatusText.SUCCESS, course: null });
    }
);

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}