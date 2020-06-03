const Product = require("../models/product");
const {ObjectId} = require("mongoose").Types;
const Double = require("@mongoosejs/double");
// const {post2Imgur} = require("../helpers/imgur.js");
const axios = require('axios')
const {customError} = require("../helpers/customError");
// const {verifyToken} = require('../helpers/jwt')
let fs = require("fs");
var data;
var imgSrc;
var foto64;
var inputData;
var token
var userId
var decrypted
var raw
const USERAPI = 'http://localhost:4001/users/'
class productCtrl {
    static async findAll(req, res, next) {
        try {
            data = await Product.find();
            return res.status(200).json({
                // message: 'FETCH ALL SUCCESS',
                // result: data
                data,
            });
        } catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            // console.log("ERROR STATUS IS");
            // console.log(err.status, "\n");
            // console.log("ERROR MESSAGE IS");
            // console.log(err.message, "\n");
            // console.log("ERROR CODE IS");
            // console.log(err.code, "\n");
            return next({code: 500, message: err.message});
        }
    }

    static async findOne(req, res, next) {
        try {
            data = await Product.findOne({
                _id: ObjectId(req.params.productid),
            });

            if (!data) {
                throw new customError(404, 'NOT FOUND')
            }

            return res.status(200).json({
                // message: 'FETCH ONE SUCCESS',
                // result: data
                data,
            });
        } catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }
    }

    // static async addNew(req, res, next) {
    //     console.log(">>> CONTROLLERS: CREATE PRODUCT. MULTER ADDED");
    //     console.log("REQ BODY IS");
    //     console.log(req.body);
    //     console.log("REQ FILES IS");
    //     console.log(req.file);
    //     // var {title, description, value, userId} = req.body;
    //     var {title, description, value} = req.body;

    //     console.log("REQ ACCESS TOKEN");
    //     console.log(req.headers.access_token);

    //     // token = req.headers.access_token
    //     decrypted = req.decoded

    //     console.log("this is decrypted")
    //     console.log(decrypted);

    //     if (req.file) {
    //         imgSrc = req.file.path;
    //         foto64 = fs.readFileSync(imgSrc, {encoding: "base64"});
    //     } else {
    //         foto64 = req.body.imageSrc;
    //     }

    //     try {

    //         title = String(title);
    //         value = +value;

    //         if (title === "" || value <= 0) {
    //             throw new customError(400, "INVALID FORMAT(S)")
    //         }

    //         // PREP INPUT DATA
    //         inputData = {
    //             title: title,
    //             description: description,
    //             photo: null,
    //             value: value,
    //             // userId: req.headers.userId
    //             userId: String(decrypted._id),
    //         };

    //         // UPLOAD IMGUR JALUR RESMI
    //         await post2Imgur(foto64)
    //             .then((response) => {
    //                 console.log("DOES IMGUR UPLOAD SUCCESS?");
    //                 console.log(response);

    //                 // IF UPLOAD TO IMGUR SUCCESS
    //                 inputData["photo"] = response;
    //                 console.log("CHECK INPUT DATA");
    //                 console.log(inputData);

    //                 return Product.create(inputData);
    //             })
    //             .then((response) => {
    //                 console.log("SUCCESS ADD");
    //                 res.status(201).json({
    //                     message: "NEW PRODUCT ADDED",
    //                     result: response,
    //                 });
    //             });
    //     } catch (err) {
    //         console.log("ERROR, ", err);
    //         // return res.status(err.status).json({
    //         //     message: err.message,
    //         // });
    //         console.log("ERROR STATUS IS");
    //         console.log(err.status, "\n");
    //         console.log("ERROR MESSAGE IS");
    //         console.log(err.message, "\n");
    //         console.log("ERROR CODE IS");
    //         console.log(err.code, "\n");
    //         return next(err);
    //     }
    // }


    static async addNew(req, res, next) {
        console.log(">>> CONTROLLERS: CREATE PRODUCT. MULTER ADDED");
        console.log("REQ BODY IS");
        console.log(req.body);

        // var {title, description, value, userId} = req.body;
        var {title, description, photopath, tagStr, value, category} = req.body;


        console.log("REQ ACCESS TOKEN");
        console.log(req.headers.access_token);

        // token = req.headers.access_token
        decrypted = req.decoded

        console.log("this is decrypted")
        console.log(decrypted);

        // var seps = /[^a-zA-Z ]+/

        var tagArr
        if(tagStr) {

            if(tagStr.includes(';')) {
                tagArr = tagStr.split(';')
            }
            else if (tagStr.includes(',')) {
                tagArr = tagStr.split(',')
            }
            else {
                tagArr = tagStr
            }

        } else {
            tagArr = []
        }


        // PREP INPUT DATA
        inputData = {
            title: title,
            description: description,
            photo: photopath,
            value: +value,
            category: category,
            tags: tagArr,
            // userId: req.headers.userId
            userId: String(decrypted._id),
        };

        

        try {

            if (title === "" || value <= 0) {
                throw new customError(400, "INVALID FORMAT(S)")
            }

            data = await Product.create(inputData);

            // return res.status(201).json({
            //     message: "NEW PRODUCT ADDED",
            //     result: response,
            // });

            return res.status(201).json({
                data
            });
            

        } catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }
    }

    static async getOwnItems (req, res, next) {
        console.log("GETTING OWN ITEMS @ PRODUCTSERVICES");
        decrypted = req.decoded
        // console.log("this is decoded")
        // console.log(decrypted);
        // userId = ObjectId(decrypted._id)

        userId = decrypted._id

        console.log("THIS IS DECRYPTED ");
        console.log(decrypted);

        try {
            
            data = await Product.find({userId: userId});
            return res.status(200).json({
                // message: 'FETCH ALL SUCCESS',
                // result: data
                data,
            });
        } catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            // console.log("ERROR STATUS IS");
            // console.log(err.status, "\n");
            // console.log("ERROR MESSAGE IS");
            // console.log(err.message, "\n");
            // console.log("ERROR CODE IS");
            // console.log(err.code, "\n");
            return next({code: 404, message: err.message});
        }

    }


    static async setTopListing (req, res, next) {
        console.log("SET TOP LISTING ");
        var itemId = ObjectId(req.params.productid)
        var {numOfDays} = req.body

        numOfDays = Number(numOfDays)

        var todayIs = new Date()

        var deadline = todayIs.setDate(todayIs.getDate() + numOfDays);
        var deadlineStr = new Date(deadline).toISOString()

        console.log("@ CONTROLLER PRIODUCTSERVICE:")
        console.log(numOfDays, itemId, deadlineStr);
        try {

            console.log("THIS IS ID 2 PRIMELIST");
            console.log(itemId);

            data = await Product.findOneAndUpdate({_id: itemId}, {
                topListingStatusDate: deadlineStr
            }, {new: true})

            console.log("WHAT IS NEWEST DEADLINE FOR TOP LISTING?");
            console.log(data);

            return res.status(200).json({
                    message: "PRIMELIST SUCCESS",
                    result: data
            });


        }
        catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }
    }


    static async bidItem(req, res, next) {
        console.log("UPDATING FOR SELECTING COLLATERAL");

        console.log("REQ PARAMS");
        console.log(req.params);

        var itemId = ObjectId(req.params.productid)
        var collateralId = ObjectId(req.params.collateralid)

        try {

            console.log("THIS IS ID 2 UPDATE");
            
            raw = await Product.findById(collateralId)
            console.log("what is raw?");
            console.log(raw);

            data = await Product.findOneAndUpdate(
                {
                    _id: itemId,
                },
                {
                    $push: {
                        bidProductId: raw
                    }
                }
                ,
                {
                    new: true,
                }
            )

            console.log("WHAT IS UPDATE FROM BID?");
            console.log(data, "\n");

            // data = await Product
            //         .findOne({_id: itemId})
            //         .populate('bidProductId', raw)
            return res.status(200).json({
                    message: "BID SUCCESS",
                    result: data
            });
        } 
        catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }
    }


    static async closeBid(req, res, next) {

        console.log("ACCEPTING BID & CLOSE THE DEAL");

        console.log("REQ PARAMS");
        console.log(req.params);

        var itemId = ObjectId(req.params.productid)
        var collateralId = ObjectId(req.params.collateralid)

        try {

            console.log("THIS IS THE CLOSING BID'S PRODUCT ID");
            
            // FIND COLLATERAL OBJECT
            raw = await Product.findById(collateralId)
            console.log("what is raw?");
            console.log(raw);

            var bidderId = raw.userId

            // FOR DEV 
            var biddersArrRaw = await axios({
                method: 'get',
                url: USERAPI
            })

            console.log("WHAT'S BIDDERS' INFO");
            console.log(biddersArrRaw.data, "\n");

            var biddersArr = biddersArrRaw.data


            var bidderInfo = biddersArr.filter(el => el._id == ObjectId(bidderId))[0]

            console.log("WHOS' FINAL BIDDER?");
            console.log(bidderInfo, "\n")


            data = await Product.findOneAndUpdate(
                {
                    _id: itemId,
                },
                {
                    $push: {
                        finalBidderId: bidderInfo, // DEV
                        // finalBidderId: bidderId, //TEST
                        finalBiddersProductId: raw
                    },
                    status: 'close'
                }
                ,
                {
                    new: true,
                }
            )

            console.log("WHAT IS UPDATE FROM BID?");
            console.log(data, "\n");

            // data = await Product
            //         .findOne({_id: itemId})
            //         .populate('bidProductId', raw)
            return res.status(200).json({
                    message: "BID CLOSED!",
                    result: data
            });
        } 
        catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }

    }


    static async rejectBid(req, res, next) {

        console.log("REJECTING BID");

        console.log("REQ PARAMS");
        console.log(req.params);

        var itemId = ObjectId(req.params.productid)
        var collateralId = ObjectId(req.params.collateralid)

        try {

            console.log("THIS IS ID 2 UPDATE");
            
            raw = await Product.findById(collateralId)
            console.log("what is raw?");
            console.log(raw);

            data = await Product.findOneAndUpdate(
                {
                    _id: itemId,
                },
                {
                    $pull: {
                        bidProductId: raw
                    }
                }
                ,
                {
                    new: true,
                }
            )

            console.log("WHAT IS UPDATE FROM BID?");
            console.log(data, "\n");

            // data = await Product
            //         .findOne({_id: itemId})
            //         .populate('bidProductId', raw)
            return res.status(200).json({
                    message: "BID REJECTED",
                    result: data
            });
        } 
        catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }

    }


    static async drop(req, res, next) {
        try {
            // await Product.deleteOne({_id: req.params.movieid})
            await Product.findOneAndDelete({_id: ObjectId(req.params.productid)}, {rawResult: true}).then(
                (response) => {
                    console.log("DELETE SUCCESS");
                    console.log(response);
                    return res.status(200).json({
                        message: "DELETE PRODUCT SUCCESS",
                        result: response,
                    });
                }
            );
        } catch (err) {
            console.log("ERROR, ", err);
            // return res.status(err.status).json({
            //     message: err.message,
            // });
            console.log("ERROR STATUS IS");
            console.log(err.status, "\n");
            console.log("ERROR MESSAGE IS");
            console.log(err.message, "\n");
            console.log("ERROR CODE IS");
            console.log(err.code, "\n");
            return next(err);
        }
    }

}

module.exports = productCtrl;
