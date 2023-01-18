const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const { register , getAllUser} = require("../controller/userController");




router.route("/register/:name/:email").post(upload.single("image"), register);
router.route("/alluser").get(getAllUser);
// router.route("/associate/:entityname/:image").put(associate);



module.exports = router;
