var entree = require("entree");

exports.init = function (swagger) {
  var getProfile = {
    "spec": {
      "description": "Operations about profiles",
      "path": "/profiles/{userId}",
      "notes": "Returns a profile based on ID",
      "method": "GET",
      "params": [swagger.pathParam("userId", "ID of user that needs to be fetched", "string")],
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getProfileById"
    },
    "action": function (req, res) {
      var id = req.params.id;
      if (!id) {
        throw swagger.errors.invalid("id");
      }
      entree.profiles.selectOne({Owner: id}, function (err, item) {
        res.json(item);
      });
    }
  };

  var updateProfile = {
    "spec": {
      "description": "Operations about prototypes",
      "path": "/profiles",
      "notes": "Returns a profile based on ID",
      "summary": "Find prototype by ID",
      "method": "PUT",
      "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getPrototypeById"
    },
    "action": function (req, res) {
      entree.profiles.upsert(req.body, function (err, item) {
        res.json(item);
      });
    }
  };

  swagger.addGet(getProfile);
};