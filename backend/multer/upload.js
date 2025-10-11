const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const uuid = require("uuid");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: "https://c2i3.c17.e2-4.dev/",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});
const s3 = new AWS.S3();
const BUCKET_NAME = "shop";
class IdriveE2Storage {
  constructor(opts) {
    this.s3 = opts.s3;
    this.bucket = opts.bucket
  }
  _handleFile(req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    const params = {
      Bucket: this.bucket,
      Key: filename,
      Body: file.stream,
      ContentType: file.mimetypem
    };

    this.s3.upload(params, (err, data) => {
      if (err) {
        console.error("Upload Error: ", err);
        return cb(err);
      }
      const location = data.Location ||
        `https://c2i3.c17.e2-4.dev/${this.bucket}/${filename}`;

      console.log("uploaded", location);
      cb(null, {
        bucket: data.Bucket,
        key: data.Key,
        location: location,
        etag: data.ETag
      });
    });
  }
  _removeFile(req, file, cb) {
    this.s3.deleteObject({
      Bucket: this.bucket,
      Key: file.key
    }, cb);
  }
}
const upload = multer({
  storage: new IdriveE2Storage({
    s3: s3,
    bucket: BUCKET_NAME,
   }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5mb limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Nur Bilder sind erlaubt!"));
    }
  }
});


module.exports = upload;
