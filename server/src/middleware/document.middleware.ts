import multer, { diskStorage } from "multer";
import path from "node:path";


const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadedFile")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`
        cb(null, uniqueSuffix)
    }
})

const allowedExtentions = [
    ".pdf",
    ".docx",
    ".txt",
]
const uploadFile = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter(req, file, cb) {
        const extension = path.extname(file.originalname)
        if (!allowedExtentions.includes(extension)) {
            return cb(new Error("Unsupported file Uploaded"))
        }
        cb(null, true)
    }

})

export default uploadFile