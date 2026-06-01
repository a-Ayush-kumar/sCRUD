// app.js

const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(
  "/api/v1/auth",
  require("./routes/auth.routes")
);

app.use(
  "/api/v1/tasks",
  require("./routes/task.routes")
);

module.exports = app;