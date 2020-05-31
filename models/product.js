const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Double = require('@mongoosejs/double')
const ProductSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'TITLE MUST BE FILLED']
  },
  description: {
      type: String,
      default: 'Lorem Ipsum'
  },
  photo: {
      type: String,
      required: [true, 'PHOTO MUST BE FILLED']
  },
  status: {
      type: String,
      enum: ['open', 'pending', 'close', 'canceled'],
      default: 'open'
  },
  value: {
      type: Double,
      required: [true, 'VALUE MUST BE FILLED']
  },
  tags: {
      type: [String]
  },
  UserId: {
       type: String
        // ,required: [true, 'USERID MUST BE FILLED']
  },
  BidProductId: [{ type: Schema.ObjectId, ref: 'Product' }],
    //    type: [String],
    

  FinalBidderId: {
       type: String
  },
  FinalBidderRating: {
      type: Double
  },
  TopListingStatusDate: {
       type: String
  }
})

module.exports = mongoose.model('Product', ProductSchema)