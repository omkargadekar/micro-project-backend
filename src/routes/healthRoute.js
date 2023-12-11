const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      serverName: "The week list server",
      currentTime: Date.now(),
      status: "Active",
    });
  } catch (error) {
    res.json({
      serverName: error.Mesaage,
      currentTime: Date.now(),
      status: "InActive",
    });
  }
});

module.exports = router;
