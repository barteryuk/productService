const {customError} = require("../helpers/customError.js");
const {ObjectId} = require("mongoose").Types;
const Product = require("../models/product");
async function authorization(req, res, next) {
    console.log(">>> AUTHORIZATION");
    try {
        let userId = req.decoded._id;
        let productId = ObjectId(req.params.productid);
        console.log("USERID IS:");
        console.log(req.decoded);
        var result  = await Product.findOne({
                _id: productId,
            });
        if (result && (String(result.userId) == String(userId))) {
            console.log("PASSED AUTHORIZATION");
            return next();
        } else {
            throw new customError(401, "UNAUTHORIZED");
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {authorization};
