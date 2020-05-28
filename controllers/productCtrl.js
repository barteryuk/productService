const Product = require('../models/product');
var data
class productCtrl {

  static async findAll(req, res) {
    try {

      data = await Product.find()
      return res.status(200).json({
        // message: 'FETCH ALL SUCCESS',
        // result: data
        data
      })

    } catch (err) {
      console.log("ERROR, ", err);
      return res.status(err.status).json({
        message: err.message
      })
    }
  }


  static async findOne(req, res) {
    try {

      data = await Product.findOne({
        _id: req.params.movieid
      })

      if(!data) {
        return res.status(404).json({
          message: 'NOT FOUND'
        })
      }

      return res.status(200).json({
        // message: 'FETCH ONE SUCCESS',
        // result: data
        data
      })

    } catch (err) {
      console.log("ERROR, ", err);
      return res.status(err.status).json({
        message: err.message
      })
    }
  }


  static async addNew(req, res) {
    let inputData = {
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
      value: req.body.tags,
      UserId: req.headers.userId
    }

    try {

      await Product.create(inputData)
        .then(response => {
          console.log("SUCCESS ADD");
          res.status(201).json({
            message: 'NEW MOVIE ADDED',
            result: response
          })
        })

    } catch (err) {
      console.log("ERROR, ", err);
      return res.status(err.status).json({
        message: err.message
      })
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
      console.log("THIS IS ID 2 UPDATE")
      console.log(req.params.movieid);
      await Product.findOneAndUpdate({
          _id: req.params.movieid
        }, updData, {
          new: true
        })
        .then(response => {
          console.log("UPDATE SUCCESS");
          return res.status(200).json({
            message: 'UPDATE MOVIE SUCCESS',
            result: response
          })
        })

    } catch (err) {
      console.log("ERROR, ", err);
      return res.status(err.status).json({
        message: err.message
      })
    }

  }


  static async drop(req, res) {
    try {

      // await Product.deleteOne({_id: req.params.movieid})
      await Product.findOneAndDelete(
        {_id: req.params.movieid},
        {rawResult: true})
        .then(response => {
          console.log("DELETE SUCCESS");
          console.log(response);
          return res.status(200).json({
            message: 'DELETE MOVIE SUCCESS',
            result: response
          })
        })

    } catch (err) {
      console.log("ERROR, ", err);
      return res.status(err.status).json({
        message: err.message
      })
    }
  }


}

module.exports = productCtrl