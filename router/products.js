const productRouter = require('express').Router()
// const { findAll, findOne, addNew, update, drop } = require('../controllers/productCtrl.js')
const { findAll, findOne, addNew, drop, bidItem, getOwnItems, rejectBid } = require('../controllers/productCtrl.js')
// const {findItem} = require('../middleware/findItem.js')
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization')

/* // MULTER SETTINGS
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cbDest) => {
        cbDest(null, 'photos/')
    },
    filename: (req, file, cbFileName) => {
        let oriname = file.originalname
        let createdAt = new Date().toISOString()
        let fotoname = createdAt+'_'+oriname
        cbFileName(null, fotoname)
    }
})

const fileFilter = (req, file, cbFilter)  => {

    let crit1 = file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' || file.mimetype === 'image/svg'

    // ONLY ACCEPTS JPG, PNG OR SVG FILES
    if(crit1) {
        cbFilter(null, true)
    } else {
        cbFilter(null, false)
    }

}

const upload = multer({
    storage: storage, 
    limits: {
        // LIMITS FILE SIZE TO 10 MB
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})  */



productRouter.get('/getall', findAll)
productRouter.get('/getone/:productid', findOne)
productRouter.use(authentication)
productRouter.post('/add', addNew)
// productRouter.post('/add', upload.single('photo'), addNew)
// productRouter.put('/:productid', update)
productRouter.get('/myItems', getOwnItems)
productRouter.put('/bid/:productid/with/:collateralid', bidItem)
productRouter.put('/rejectBid/:productid/with/:collateralid', rejectBid)
productRouter.delete('/drop/:productid', authorization, drop)

module.exports = productRouter