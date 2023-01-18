var ls = require("local-storage");



exports.register = function (req, res, next) {
  try {
    let name = req.params.name;
    let email = req.params.email;
    // unique user ID
    let userId = `user_${Date.now()}`;
    // console.log(req.file.originalname);
    let profilePic = req.file.originalname;
    let userInfo = {};
    userInfo.userId=userId;
    userInfo.name = name;
    userInfo.email = email;
    userInfo.profilePic = profilePic;
  ls.set('user',ls.get('user') && [...ls.get('user'),userInfo] || [userInfo]);
    

    // if (!ls.get("user")) {
    //   userMap.set(userId, JSON.stringify(userInfo));
    //   console.log(userMap);
    //   ls.set(userId, JSON.stringify(userInfo));
    // } else {
    //     console.log(ls.get('user'));
    //   let newMap = new Map(JSON.parse(Object.entries(ls.get("user"))));
    //   console.log(newMap);
    //   newMap.set(userId, JSON.stringify(userInfo));
      
    //   ls.set("user", JSON.stringify(Object.entries(newMap)));
    // }
   // console.log(ls.get('user'));
    res.send("Successfully registered");
  } catch (err) {
    res.send("Error while registering");
    console.log(err);
  }
};

exports.getAllUser = function (req, res, next) {
  try {
    let userData = ls.get("user");
    console.log(ls.get('user'));
    res.send(userData ? userData : "No user found");
  } catch (err) {
    res.send("error while getting users");
    console.log(err);
  }
};
