// src/app.js
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

app.use("/auth", require("./routes/auth.routes"));
app.use("/tasks", require("./routes/task.routes"));
// app.use("/teams", require("./routes/team.routes"));
app.use("/projects", require("./routes/project.routes"));
// app.use("/tags", require("./routes/tag.routes"));
// app.use("/report", require("./routes/report.routes"));

module.exports = app;
