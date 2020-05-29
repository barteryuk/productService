const productRouter = require('express').Router()
// const { findAll, findOne, addNew, update, drop } = require('../controllers/productCtrl.js')
const { findAll, findOne, addNew, drop } = require('../controllers/productCtrl.js')
// const {findItem} = require('../middleware/findItem.js')


// MULTER SETTINGS
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
}) 



productRouter.get('/getall', findAll)
productRouter.get('/getone/:productid', findOne)
productRouter.post('/add', upload.single('photo'), addNew)
// productRouter.put('/:productid', update)
productRouter.delete('/drop/:productid', drop)

module.exports = productRouter