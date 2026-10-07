const express = require("express");

const {
  userLogin,
  userRegistration,
} = require("../Controller/authControllers");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);

module.exports = router;
