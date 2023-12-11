const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const connectDB = require("./src/db/connectDB");
const verifyJWT = require("./src/middlewares/verifyJWT");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieparser());

app.use("/", require("./src/routes/root"));
app.use("/health", require("./src/routes/healthRoute"));
app.use("/auth", require("./src/routes/authRoutes"));

app.use(verifyJWT);
app.use("/weeklist", require("./src/routes/weekListRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
