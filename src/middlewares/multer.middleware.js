import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pulic/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })
