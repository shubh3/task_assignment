// const ls = require('../utils/storage')
var ls = require("local-storage");
const fs = require("fs");

// // /:entityName/:id

exports.uploader = function (req, res, next) {
  //   // req.file is the `avatar` file
  try {
    let entityName = req.params.entityName;
    let id = req.query.id ? req.query.id : `temp_${Date.now()}`;
    let idImageMap = new Map();
    idImageMap.set(id, `${entityName}--${id}--${req.file.originalname}`);
    console.log(idImageMap);

    let idStringMap = JSON.stringify(Object.fromEntries(idImageMap));
    if (!ls.get(entityName)) {
      ls.set(entityName, idStringMap);
    } else {
      let newMap = new Map(Object.entries(JSON.parse(ls.get(entityName))));
      newMap.set(id, JSON.stringify(Object.fromEntries(idImageMap)));
      ls.set(entityName, JSON.stringify(Object.fromEntries(newMap)));
    }
    // console.log();
    console.log(ls.get(entityName));
    res.send(
      `file uploaded sucessfully for entity name ${entityName} with id ${id}`
    );
    //   // req.body will hold the text fields, if there were any
  } catch (err) {
    console.log(err);
    res.send("File uploading failed");
  }
};

exports.getEntityData = function (req, res, next) {
  try {
    let entityName = req.params.entityname;
    let data = ls.get(entityName);

    res.send(data ? data : "No data found for this Entity");
  } catch (err) {
    res.send("Error whole searching");
    console.log(err);
  }
};

exports.associate = function (req, res, next) {
  try {
    let entityName = req.params.entityname;
    let id = req.query.id;
    let image = req.params.image;

    let data = new Map(Object.entries(JSON.parse(ls.get(entityName))));
    for (let [key, value] of data) {
      if (value.includes("temp_") && value.includes(image)) {
        data.delete(key);
        data.set(id, image);
        break;
      }
    }
    ls.set(entityName, JSON.stringify(Object.fromEntries(data)));
    res.send(ls.get(entityName));
  } catch (err) {
    res.send("Error while associating");
    console.log(err);
  }
};

exports.update = function (req, res, next) {
  try {
    let entityName = req.params.entityname;
    let id = req.params.id;
    let image = req.file.originalname;

    let data = new Map(Object.entries(JSON.parse(ls.get(entityName))));
    for (let [key, value] of data) {
      if (key == id) {
        data.delete(key);
        data.set(id, image);
        break;
      }
    }
    ls.set(entityName, JSON.stringify(Object.fromEntries(data)));
    res.send("image Updated successfuly" + "Result ->   " + ls.get(entityName));
  } catch (err) {
    res.status(400);
    res.send("Error while updating image");
    
    console.log(err);
  }
};

exports.deletion = function (req, res, next) {
  try {
    let entityName = req.params.entityname;
    if (entityName) {
      let files = fs.readdirSync("./uploads");
      files.forEach((file) => {
        if (file.includes(entityName)) {
          fs.unlink(
            `./uploads/${file}`,
            (err) => {
              if (err) console.log(err);
              else {
                console.log(`Deleted file: ${file}`);
              }
            }
          );
        }
      });

      ls.remove(entityName);
    }

    res.send("Succesffuly deleted all files");
  } catch (err) {
    res.send("Error while deleting the files");
    console.log(err);
  }
};
exports.download = function (req, res, next) {
try{
  let imgPath =`./uploads/${req.params.filename}`
  fs.readFile(imgPath,(err,data)=>{
    if(err){
      console.log(err);
    }

    res.contentType('image/jpg')
    res.send(data);
  })
}
catch(err){
  console(err);
  res.send('Error while downloading');
}
}
