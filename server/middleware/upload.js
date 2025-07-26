const multer = require("multer");

const path = require("path");
const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename : function(req, file, cb){
        const fileName = Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
})

const upload = multer({ storage });
module.exports = upload;