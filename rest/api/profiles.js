var entree = require("entree"),
  needle = require("needle");

exports.init = function (swagger) {
  var getProfile = {
    "spec": {
      "description": "Returns the profile for the current user.",
      "path": "/profile",
      "notes": "Returns the profile for the current user.",
      "method": "GET",
      "responseClass": "Profile",
      "nickname": "getProfile"
    },
    "action": function (req, res) {
      var userId = req.user.Id;
      needle.request("get",
        'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/',
        {
          json: true,
          headers: { "Authorization": req.headers.authorization,
            "X-Everlive-Filter": JSON.stringify({ "Owner": req.user.id })}
        },
        function (error, response) {
          res.json(response.body.Result[0]);
        });
    }
  };

  var addProfile = {
    "spec": {
      "description": "Set a profile for the current user",
      "path": "/profile",
      "notes": "Set a profile for the current user",
      "method": "POST",
      "responseClass": "Profile",
      "nickname": "addProfile"
    },
    "action": function (req, res) {
      needle.request("post",
        'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles',
        req.body,
        {
          json: true,
          headers: { "Authorization": req.headers.authorization}
        },
        function (error, response, body) {
          res.json(body.Result);
        });
    }
  };

  var updateProfile = {
    "spec": {
      "description": "Set a profile for the current user",
      "path": "/profile/{id}",
      "notes": "Set a profile for the current user",
      "method": "PUT",
      "responseClass": "Profile",
      "nickname": "addProfile"
    },
    "action": function (req, res) {
      needle.request("put",
          'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/' + req.params.id,
        req.body,
        {
          json: true,
          headers: { "Authorization": req.headers.authorization}
        },
        function (error, response, body) {
          res.json(body);
        });
    }
  };

  swagger.addGet(getProfile);
  swagger.addPost(addProfile);
  swagger.addPut(updateProfile);
};