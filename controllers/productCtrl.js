const Product = require("../models/product");
const {ObjectId} = require("mongoose").Types;
const {post2Imgur} = require("../helpers/imgur.js");
let fs = require("fs");
var data;
var imgSrc;
var foto64;
class productCtrl {
    static async findAll(req, res) {
        try {
            data = await Product.find();
            return res.status(200).json({
                // message: 'FETCH ALL SUCCESS',
                // result: data
                data,
            });
        } catch (err) {
            console.log("ERROR, ", err);
            return res.status(err.status).json({
                message: err.message,
            });
        }
    }

    static async findOne(req, res) {
        try {
            data = await Product.findOne({
                _id: req.params.movieid,
            });

            if (!data) {
                return res.status(404).json({
                    message: "NOT FOUND",
                });
            }

            return res.status(200).json({
                // message: 'FETCH ONE SUCCESS',
                // result: data
                data,
            });
        } catch (err) {
            console.log("ERROR, ", err);
            return res.status(err.status).json({
                message: err.message,
            });
        }
    }

    static async addNew(req, res) {
        console.log(">>> CONTROLLERS: CREATE PRODUCT. MULTER ADDED");
        console.log("REQ BODY IS");
        console.log(req.body);
        console.log("REQ FILES IS");
        console.log(req.file);
        const {title, description, value, UserId} = req.body;

        if (req.file) {
            imgSrc = req.file.path;
            foto64 = fs.readFileSync(imgSrc, {encoding: "base64"});
        } else {
            foto64 = req.body.imageSrc;
        }

        let inputData = {
            title: title,
            description: description,
            photo: null,
            value: value,
            // UserId: req.headers.userId
            UserId: UserId,
        };

        try {
            // UPLOAD IMGUR JALUR RESMI
            await post2Imgur(foto64)
              .then(response => {
                console.log("DOES IMGUR UPLOAD SUCCESS?");
                console.log(response);

                // IF UPLOAD TO IMGUR SUCCESS
                inputData['photo'] = response
                console.log("CHECK INPUT DATA");
                console.log(inputData);

                return Product.create(inputData)
            })
            .then((response) => {
                console.log("SUCCESS ADD");
                res.status(201).json({
                    message: "NEW PRODUCT ADDED",
                    result: response,
                });
            })
  
        } catch (err) {
            console.log("ERROR, ", err);
            return res.status(err.status).json({
                message: err.message,
            });
        }
    }

    static async update(req, res) {
        let updData = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: req.body.tags,
        };

        try {
            // await Product.updateOne({
            //     _id: req.params.movieid
            //   }, updData)
            console.log("THIS IS ID 2 UPDATE");
            console.log(req.params.movieid);
            await Product.findOneAndUpdate(
                {
                    _id: req.params.movieid,
                },
                updData,
                {
                    new: true,
                }
            ).then((response) => {
                console.log("UPDATE SUCCESS");
                return res.status(200).json({
                    message: "UPDATE MOVIE SUCCESS",
                    result: response,
                });
            });
        } catch (err) {
            console.log("ERROR, ", err);
            return res.status(err.status).json({
                message: err.message,
            });
        }
    }

    static async drop(req, res) {
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
            return res.status(err.status).json({
                message: err.message,
            });
        }
    }
}

module.exports = productCtrl;
