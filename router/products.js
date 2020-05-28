const productRouter = require('express').Router()
const { findAll, findOne, addNew, update, drop } = require('../controllers/productController.js')
const {findItem} = require('../middleware/findItem.js')

productRouter.get('/', findAll)
productRouter.get('/:productid', findOne)
productRouter.post('/', addNew)
productRouter.put('/:productid', findItem, update)
productRouter.delete('/:productid', findItem,  drop)

module.exports = productRouter