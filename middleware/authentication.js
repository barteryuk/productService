const {verifyToken} = require("../helpers/jwt");
const {customError} = require("../helpers/customError.js");
function authentication(req, res, next) {
    console.log(">>> AUTHENTICATION");
    try {
        let token = req.headers.access_token;
        let payload = verifyToken(token);
        if (token) {
            console.log("PASSED AUTHENTICATION");
            req.decoded = payload;
            return next();
        } else {
            throw new customError(401, "UNAUTHORIZED");
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {authentication};
