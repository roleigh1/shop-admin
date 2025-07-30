const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: "https://c2i3.c17.e2-4.dev/",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

console.log("S3 Credentials:", {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
