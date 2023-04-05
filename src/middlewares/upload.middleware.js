const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/public/img`)
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now()
    cb(
      null,
      file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
    )
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(null, false)
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

module.exports = upload
