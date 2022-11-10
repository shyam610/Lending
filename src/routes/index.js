const express = require("express");
const bcrypt = require("bcryptjs");
const { registeration } = require("../module/user/user.controller");
const upload = require("../helper/upload");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("form-page");
});

router.post(
  "/create-account",
  upload.fields([
    {
      name: "drivinLicense",
      maxCount: 1,
    },
    {
      name: "bankStatemets",
      maxCount: 3,
    },
    {
      name: "voided",
      maxCount: 1,
    },
  ]),
  registeration
);

module.exports = router;
