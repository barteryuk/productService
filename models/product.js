const mongoose = require('mongoose')
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
      type: [String],
      default: []
  },
  userId: {
       type: String
        // ,required: [true, 'USERID MUST BE FILLED']
  },
  category: {
      type: String,
      enum: ['BNIB', 'BNOB', 'Used'],
      default: 'Used'
  },
  bidProductId: [{}],
  productOwnerRating: {
      type: Double,
      min: 0,
      max: 5,
      default: 5
  },
  finalBidderId: [{}],
  finalBiddersProductId: [{}],
  finalBidderRating: {
      type: Double,
      min: 0,
      max: 5,
      default: 0
  },
  topListingStatusDate: {
       type: String,
       default: ""
  }
})

module.exports = mongoose.model('Product', ProductSchema)