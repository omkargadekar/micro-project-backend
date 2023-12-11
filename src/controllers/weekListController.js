const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const WeekList = require("../models/weekList.model");

const addWeekList = async (req, res) => {
  try {
    const { description, tasks } = req.body;
    console.log(req);
    const user = req.user;

    // Check if the user already has two active week lists
    const activeWeekListsCount = await WeekList.countDocuments({
      user: user._id,
      state: "active",
    });

    if (activeWeekListsCount >= 2) {
      return res
        .status(400)
        .json({ message: "You already have two active week lists." });
    }

    const newWeekList = await WeekList.create({
      user: user._id,
      description,
      tasks: tasks.map((task) => ({ description: task })),
    });

    res
      .status(201)
      .json({ message: "Week list added successfully", weekList: newWeekList });
  } catch (error) {
    console.error("Error adding week list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// authController.js

const updateWeekList = async (req, res) => {
  try {
    const weekListId = req.params.id;
    const { description, tasks } = req.body;

    const weekList = await WeekList.findById(weekListId);

    if (!weekList) {
      return res.status(404).json({ message: "Week list not found" });
    }

    // Check if the week list is within the update window (24 hours)
    const updateWindowEnd = new Date(
      weekList.createdAt.getTime() + 24 * 60 * 60 * 1000
    );
    const currentTime = new Date();

    if (currentTime > updateWindowEnd) {
      return res
        .status(403)
        .json({ message: "Cannot update the week list after 24 hours" });
    }

    // Update the week list
    weekList.description = description;
    weekList.tasks = tasks.map((task) => ({ description: task }));
    await weekList.save();

    res.json({ message: "Week list updated successfully", weekList });
  } catch (error) {
    console.error("Error updating week list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteWeekList = async (req, res) => {
  try {
    const weekListId = req.params.id;

    const weekList = await WeekList.findById(weekListId);

    if (!weekList) {
      return res.status(404).json({ message: "Week list not found" });
    }

    // Check if the week list is within the delete window (24 hours)
    const deleteWindowEnd = new Date(
      weekList.createdAt.getTime() + 24 * 60 * 60 * 1000
    );
    const currentTime = new Date();

    if (currentTime > deleteWindowEnd) {
      return res
        .status(403)
        .json({ message: "Cannot delete the week list after 24 hours" });
    }

    // Delete the week list
    await weekList.remove();

    res.json({ message: "Week list deleted successfully" });
  } catch (error) {
    console.error("Error deleting week list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// authController.js

const markTask = async (req, res) => {
  try {
    const weekListId = req.params.id;
    const { taskId, isCompleted } = req.body;

    const weekList = await WeekList.findById(weekListId);

    if (!weekList) {
      return res.status(404).json({ message: "Week list not found" });
    }

    // Mark/unmark the task
    const task = weekList.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = isCompleted;
    task.completionTime = isCompleted ? new Date() : null;

    await weekList.save();

    res.json({ message: "Task updated successfully", weekList });
  } catch (error) {
    console.error("Error marking task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// authController.js

const getAllWeekLists = async (req, res) => {
  try {
    const weekLists = await WeekList.find({ user: req.user._id });

    // Calculate time left for each week list
    const currentTime = new Date();
    const weekListsWithTimeLeft = weekLists.map((weekList) => {
      const deadline = new Date(
        weekList.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      const timeLeft = Math.max(deadline - currentTime, 0);
      return {
        ...weekList.toObject(),
        timeLeft: timeLeft,
      };
    });

    res.json({ weekLists: weekListsWithTimeLeft });
  } catch (error) {
    console.error("Error getting week lists:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllWeekLists };

module.exports = {
  addWeekList,
  updateWeekList,
  deleteWeekList,
  markTask,
  getAllWeekLists,
};
