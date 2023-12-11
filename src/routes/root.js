const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    Mesaage: "Server is running ",
    currentTime: Date.now(),
    status: "Active",
  });
});

module.exports = router;
