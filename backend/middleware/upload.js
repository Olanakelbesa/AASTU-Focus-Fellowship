import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir = path.join(process.cwd(), "uploads");
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5MB limit
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});

export default upload;