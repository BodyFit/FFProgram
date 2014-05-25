var entree = require("entree"),
  _ = require("lodash"),
  needle = require("needle");

function _getProfile(userId, token, done) {
  needle.get(
    'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/',
    {
      json: true,
      headers: { "Authorization": token,
        "X-Everlive-Filter": JSON.stringify({ "Owner": userId })}
    },
    function (error, response) {
      done(response.body.Result[0]);
    });
};

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
      _getProfile(userId, req.headers.authorization, function (profile) {
        res.json(profile || {});
      })
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
      "path": "/profile",
      "notes": "Set a profile for the current user",
      "method": "PUT",
      "responseClass": "Profile",
      "nickname": "addProfile"
    },
    "action": function (req, res) {
      var updatedProfile = req.body,
        token = req.headers.authorization;

      _getProfile(req.user.Id, token, function (profile) {
        var method, url;
        _.extend(profile, updatedProfile);
        if (profile) {
          method = "put";
          url = 'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/' + profile.Id;
        }
        else {
          method = "put";
          url = 'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/';
        }

        needle.request(method,
          url,
          profile,
          {
            json: true,
            headers: { "Authorization": token}
          },
          function (error, response, body) {
            res.json(body.Result);
          });
      })
    }
  };

  swagger.addGet(getProfile);
  swagger.addPost(addProfile);
  swagger.addPut(updateProfile);
};