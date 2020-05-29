const router = require('express').Router()
const productRoutes = require('./products.js')


// router.get('/', (req, res) => {
//   console.log("WILKOMMEN");
//   res.status(200).json({
//     message: 'MOVIE HOME DOMAIN CONNECTED'
//   })
// })

router.use('/products', productRoutes)

module.exports = router