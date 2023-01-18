const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${req.params.entityName}--${req.query.id}--${file.originalname}`);
    },
  });

  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/; //check extension names
  
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

 exports.upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });