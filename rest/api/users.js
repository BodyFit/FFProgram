var entree = require("entree"),
  request = require('request');

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
      request.get(
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