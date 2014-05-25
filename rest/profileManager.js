var needle = require("needle");

function _getProfile(userId, token, done) {
  needle.get(
    'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/profiles/',
    {
      json: true,
      headers: { "Authorization": token,
        "X-Everlive-Filter": JSON.stringify({ "Owner": userId })}
    },
    function (error, response) {
      done(response.body.Result[0] || {});
    });
};

exports.getProfile = _getProfile;