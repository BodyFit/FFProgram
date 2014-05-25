var async = require("async");

exports.init = function (swagger) {
    var createProgram = {
        "spec": {
            "description": "Operations about prototypes",
            "path": "/programs/{id}",
            "notes": "Returns a prototype based on ID",
            "summary": "Find prototype by ID",
            "method": "GET",
            "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
            "responseClass": "Prototype",
            "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
            "nickname": "getPrototypeById"
        },
        "action": function (req, res) {
            res.end();
        }
    };

    swagger.addGet(createProgram);
};