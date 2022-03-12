const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

//connect to DB
connectDB();
const app = express();

//These 2 lines of middleware are nessecary to read json/urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//this uses the express router to connect the http request to the folder/file that contains the request
app.use("/api/goals", require("./routes/goalRoutes"));

//Using this errHandler will overwrite the default errorhandler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
