var entree = require("entree"),
  _ = require("lodash"),
  pm = require("../profileManager"),
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
      pm.getProfile(userId, req.headers.authorization, function (profile) {
        res.json(profile);
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
      "path": "/profile",
      "notes": "Set a profile for the current user",
      "method": "PUT",
      "responseClass": "Profile",
      "nickname": "addProfile"
    },
    "action": function (req, res) {
      var updatedProfile = req.body,
        token = req.headers.authorization;

      pm.getProfile(req.user.Id, token, function (profile) {
        var method, url;
        _.extend(profile, updatedProfile);
        if (profile.Id) {
          method = "put";
          url = 'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/' + profile.Id;
        }
        else {
          method = "post";
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

  var addBiometrics = {
    "spec": {
      "description": "Add biometrics for the current user",
      "path": "/biometrics",
      "notes": "Add biometrics for the current user",
      "method": "POST",
      "responseClass": "Biometrics",
      "nickname": "addBiometrics"
    },
    "action": function (req, res) {
      var biometrics = req.body,
        token = req.headers.authorization;

      needle.post(
        "http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/biometrics/",
        biometrics,
        {
          json: true,
          headers: { "Authorization": token}
        },
        function (error, response, body) {
          res.json(body.Result);
        });
    }
  };

  var getBiometrics = {
    "spec": {
      "description": "Add biometrics for the current user",
      "path": "/biometrics",
      "notes": "Add biometrics for the current user",
      "method": "GET",
      "responseClass": "Biometrics",
      "nickname": "addBiometrics"
    },
    "action": function (req, res) {
      var userId = req.user.Id,
        token = req.headers.authorization;

      pm.getBiometrics(userId, token, function (biom) {
        res.json(biom);
      });
    }
  };

  swagger.addGet(getProfile);
  swagger.addPost(addProfile);
  swagger.addPut(updateProfile);

  swagger.addPost(addBiometrics);
  swagger.addGet(getBiometrics);
};