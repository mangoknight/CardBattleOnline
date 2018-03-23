const crypto = require('crypto');
function enc(pwd)
{
    var hash = crypto.createHash("md5");
    hash.update(new Buffer(pwd, "binary"));
    var encode = hash.digest('hex');
    return encode;
}
module.exports.enc=enc;