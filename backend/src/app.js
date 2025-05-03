const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const initializeDatabase = require("./config/db.config");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Initialize database
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Gotask - Backend server");
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));
app.use("/projects", require("./routes/project.routes"));

module.exports = app;
