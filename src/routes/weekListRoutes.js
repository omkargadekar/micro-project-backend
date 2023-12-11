const express = require("express");
const {
  addWeekList,
  updateWeekList,
  deleteWeekList,
  markTask,
  getAllWeekLists,
} = require("../controllers/weekListController");

const router = express.Router();

router.route("/add-week-list").post(addWeekList);
router.route("/update-week-list/:id").post(updateWeekList);
router.route("/delete-week-list/:id").post(deleteWeekList);
router.route("/mark-task/:id").post(markTask);
router.route("/getall-week-list").post(getAllWeekLists);

module.exports = router;
