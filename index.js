require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");

const coursesRoutes = require("./routes/courses_routes");
const usersRoutes = require("./routes/users_routes");

const httpStatusText = require("./utils/httpStatusText");


const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());


app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);


app.use((req, res) => {
  res
    .status(404)
    .json({
      status: httpStatusText.ERROR,
      message: "This resource is not available",
    });
});


app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500 , data : null });
});









app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
