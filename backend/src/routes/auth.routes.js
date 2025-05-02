const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { signup, login, getUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, getUser);

module.exports = router;
