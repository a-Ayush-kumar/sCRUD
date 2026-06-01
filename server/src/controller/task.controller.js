const { redisClient } = require("../config/redis");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    team: req.user.team,
    createdBy: req.user.id,
  });

  if (redisClient) {
    await redisClient.del(`tasks:${req.user.team}`);
  }

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  try {
    const cacheKey = `tasks:${req.user.team}`;

    let cachedTasks = null;

    if (redisClient) {
      cachedTasks = await redisClient.get(cacheKey);
    }
    if (cachedTasks) {
      console.log("CACHE HIT");

      return res.json(JSON.parse(cachedTasks));
    }

    console.log("CACHE MISS");

    const tasks = await Task.find({
      team: req.user.team,
    });
    if (redisClient) {
    await redisClient.set(cacheKey, JSON.stringify(tasks), "EX", 300);
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  if (redisClient) {
    await redisClient.del(`tasks:${req.user.team}`);
  }
  if (req.user.role === "user" && task.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Not allowed",
    });
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  if (redisClient) {
    await redisClient.del(`tasks:${req.user.team}`);
  }
  if (req.user.role === "user" && task.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Not allowed",
    });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted",
  });
};
