const mongoose = require("mongoose");
require("dotenv").config();

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completionTime: {
    type: Date,
    default: null,
  },
});

const weekListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [taskSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    state: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const WeekList = mongoose.model("WeekList", weekListSchema);

module.exports = WeekList;
