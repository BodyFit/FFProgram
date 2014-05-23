var entree = require("entree");

exports.init = function (swagger) {
    var getUser = {
        "spec": {
            "description": "Operations about profiles",
            "path": "/users/{id}",
            "notes": "Returns a profile based on ID",
            "method": "GET",
            "params": [swagger.pathParam("id", "ID of user that needs to be fetched", "string")],
            "responseClass": "User",
            "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
            "nickname": "getUserById"
        },
        "action": function (req, res) {
            var id = req.params.id;
            if (!id) {
                throw swagger.errors.invalid("id");
            }
            entree.Users.get(id, function(err, item){
              res.json(item);
            });
        }
    };

  var addUser = {
    "spec": {
      "description": "Operations about prototypes",
      "path": "/users",
      "notes": "Returns a profile based on ID",
      "summary": "Find prototype by ID",
      "method": "POST",
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getPrototypeById"
    },
    "action": function (req, res) {
      entree.Users.insert(req.body, function(err, item){
        res.json(item);
      });
    }
  };

  swagger.addGet(getUser);
  swagger.addPost(addUser);
};