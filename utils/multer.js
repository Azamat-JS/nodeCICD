const fs = require("fs");
const path = require("path");
const { BadRequestError, NotFoundError } = require("../errors");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../uploads");

// Ensure uploads directory exists
async function ensureUploadDir() {
  try {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }
}
ensureUploadDir();

// File filter for allowed image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new BadRequestError("Invalid file type. Only images allowed"), false);
  }
  cb(null, true);
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${Date.now()}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

class FileUploader {
  singleImage(req, res, next) {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return next(new BadRequestError(err.message));
      }
      if (!req.file) {
        return next(new NotFoundError("No image provided for upload"));
      }
      req.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      next();
    });
  }

  multipleImages(req, res, next) {
    upload.array("images", 3)(req, res, (err) => {
      if (err) {
        return next(new BadRequestError(err.message));
      }
      if (!req.files || req.files.length === 0) {
        return next(new NotFoundError("No files were provided for upload"));
      }
      req.fileUrls = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      next();
    });
  }

  multipleTypes(req, res, next) {
    upload.fields([
      { name: "front_image", maxCount: 1 },
      { name: "inner_image", maxCount: 1 },
      { name: "back_image", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        return next(new BadRequestError(err.message));
      }
      if (
        !req.files ||
        !req.files["front_image"] ||
        !req.files["inner_image"] ||
        !req.files["back_image"]
      ) {
        return next(new NotFoundError("No files provided for upload. Please include required files."));
      }
      req.fileUrl1 = `${req.protocol}://${req.get("host")}/uploads/${req.files["front_image"][0].filename}`;
      req.fileUrl2 = `${req.protocol}://${req.get("host")}/uploads/${req.files["inner_image"][0].filename}`;
      req.fileUrl3 = `${req.protocol}://${req.get("host")}/uploads/${req.files["back_image"][0].filename}`;
      next();
    });
  }
}

module.exports = new FileUploader();
