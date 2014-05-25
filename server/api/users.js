var entree = require("entree"),
  needle = require('needle');

exports.init = function (swagger) {
  var userMe = {
    "spec": {
      "description": "Operations about profiles",
      "path": "/users/me",
      "notes": "Returns a profile based on ID",
      "method": "GET",
      "responseClass": "User",
      "nickname": "getMe"
    },
    "action": function (req, res) {
      needle.get(
        'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/Users/me',
        { headers: { "Authorization": req.headers.authorization} },
        function (error, response, body) {
          if (!error) {
            res.json(JSON.parse(body).Result);
          }
          else {
            res.end();
          }
        });
    }
  };

  swagger.addGet(userMe);
};