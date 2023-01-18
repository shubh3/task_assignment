const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const { uploader,getEntityData,associate, update ,deletion,download} = require("../controller/entityController.js");




router.route("/upload/:entityName/").post(upload.single("image"), uploader);
router.route("/search/entity/:entityname").get(getEntityData);
router.route("/associate/:entityname/:image").put(associate);
router.route("/update/:entityname/:id").put(upload.single("image"), update);
router.route("/delete/:entityname").delete(deletion);
router.route("/download/:filename").get(download);



module.exports = router;
