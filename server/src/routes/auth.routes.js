const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


const {
  register,
  login,
} = require("../controller/auth.controller");

router.post("/register", register);
router.post("/login", login);

module.exports = router;