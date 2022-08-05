const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3011;

//connect to DB
connectDB();
const app = express();

//These 2 lines of middleware are nessecary to read json/urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//this uses the express router to connect the http request to the folder/file that contains the request
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set NODE_ENV to production"));
}
//Using this errHandler will overwrite the default errorhandler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
